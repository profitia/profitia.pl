'use client'

import { useEffect, useRef, useState } from 'react'
import { Editor, EditorContent, Extension, mergeAttributes, Node, useEditor, useEditorState } from '@tiptap/react'
import type { Node as ProseMirrorNode } from '@tiptap/pm/model'
import StarterKit from '@tiptap/starter-kit'
import { TableKit } from '@tiptap/extension-table'
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  RefreshCw,
  SquarePen,
  Table2,
  Trash2,
  Undo2,
} from 'lucide-react'
import { uploadMediaFile } from '@/lib/media/client'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
}

interface ToolbarButtonProps {
  active?: boolean
  disabled?: boolean
  label: string
  onClick: () => void
  children: React.ReactNode
}

function ToolbarButton({ active = false, disabled = false, label, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={`flex h-9 w-9 items-center justify-center border-r border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-35 ${active ? 'bg-brand-primary/10 text-brand-primary' : 'bg-white'}`}
      disabled={disabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  )
}

function isAllowedLink(href: string) {
  return /^(https?:\/\/|mailto:|\/|#)/i.test(href)
}

type ImageDialog = {
  mode: 'add' | 'edit' | 'replace'
  alt: string
  caption: string
}

function selectedMedia(editor: Editor) {
  const { selection } = editor.state
  for (let depth = selection.$from.depth; depth > 0; depth -= 1) {
    const node = selection.$from.node(depth)
    if (node.type.name === 'figure') {
      return {
        pos: selection.$from.before(depth),
        node,
        image: node.child(0),
        caption: node.childCount > 1 ? node.child(1).textContent : '',
      }
    }
  }

  const node = (selection as typeof selection & { node?: ProseMirrorNode }).node
  if (node?.type.name === 'image') {
    return { pos: selection.from, node, image: node, caption: '' }
  }
  return null
}

function imageNodeJson(attrs: Record<string, unknown>, caption: string) {
  const image = { type: 'image', attrs }
  return caption.trim()
    ? { type: 'figure', content: [image, { type: 'figcaption', content: [{ type: 'text', text: caption.trim() }] }] }
    : image
}

function replaceSelectedMedia(editor: Editor, attrs: Record<string, unknown>, caption: string) {
  const selected = selectedMedia(editor)
  if (!selected) return false
  const replacement = editor.schema.nodeFromJSON(imageNodeJson(attrs, caption))
  editor.view.dispatch(editor.state.tr.replaceWith(selected.pos, selected.pos + selected.node.nodeSize, replacement))
  return true
}

export const articleContentExtensions = [
  Extension.create({
    name: 'articleAttributes',
    addGlobalAttributes() {
      return [
        { types: ['heading'], attributes: { id: { default: null } } },
        { types: ['tableHeader'], attributes: { scope: { default: null } } },
      ]
    },
  }),
  Node.create({
    name: 'image',
    group: 'block',
    atom: true,
    addAttributes() {
      return Object.fromEntries(['src', 'alt', 'title', 'width', 'height', 'loading'].map((name) => [name, { default: null }]))
    },
    parseHTML: () => [{ tag: 'img[src]' }],
    renderHTML: ({ HTMLAttributes }) => ['img', mergeAttributes(HTMLAttributes)],
  }),
  Node.create({
    name: 'figcaption',
    group: 'block',
    content: 'inline*',
    parseHTML: () => [{ tag: 'figcaption' }],
    renderHTML: ({ HTMLAttributes }) => ['figcaption', mergeAttributes(HTMLAttributes), 0],
  }),
  Node.create({
    name: 'figure',
    group: 'block',
    content: 'image figcaption?',
    parseHTML: () => [{ tag: 'figure' }],
    renderHTML: ({ HTMLAttributes }) => ['figure', mergeAttributes(HTMLAttributes), 0],
  }),
]

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [imageDialog, setImageDialog] = useState<ImageDialog | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageBusy, setImageBusy] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          autolink: true,
          defaultProtocol: 'https',
          openOnClick: false,
          HTMLAttributes: { rel: 'noopener noreferrer' },
        },
      }),
      TableKit.configure({ table: { resizable: false } }),
      ...articleContentExtensions,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        'aria-label': 'Article content',
        class: 'min-h-[26rem] px-5 py-4 text-[15px] leading-7 text-gray-700 outline-none',
      },
    },
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getHTML()),
  })

  const toolbarState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => currentEditor ? {
      paragraph: currentEditor.isActive('paragraph'),
      heading2: currentEditor.isActive('heading', { level: 2 }),
      heading3: currentEditor.isActive('heading', { level: 3 }),
      bold: currentEditor.isActive('bold'),
      italic: currentEditor.isActive('italic'),
      link: currentEditor.isActive('link'),
      bulletList: currentEditor.isActive('bulletList'),
      orderedList: currentEditor.isActive('orderedList'),
      blockquote: currentEditor.isActive('blockquote'),
      canDeleteTable: currentEditor.can().deleteTable(),
      imageSelected: Boolean(selectedMedia(currentEditor)),
      canUndo: currentEditor.can().undo(),
      canRedo: currentEditor.can().redo(),
    } : null,
  })

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [editor, value])

  if (!editor) {
    return <div className="min-h-[26rem] animate-pulse bg-gray-50" />
  }

  const setLink = () => {
    const currentHref = editor.getAttributes('link').href as string | undefined
    const href = window.prompt('Link URL', currentHref ?? 'https://')?.trim()
    if (href === undefined) return
    if (!href) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    if (!isAllowedLink(href)) {
      window.alert('Use an HTTP, HTTPS, mailto, relative or anchor link.')
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
  }

  const openImageDialog = (mode: ImageDialog['mode']) => {
    const selected = selectedMedia(editor)
    if (mode !== 'add' && !selected) return
    setImageFile(null)
    setImageError(null)
    setImageDialog({
      mode,
      alt: selected?.image.attrs.alt ?? '',
      caption: selected?.caption ?? '',
    })
  }

  const closeImageDialog = () => {
    if (imageBusy) return
    setImageDialog(null)
    setImageFile(null)
    setImageError(null)
    if (imageInputRef.current) imageInputRef.current.value = ''
  }

  const submitImageDialog = async () => {
    if (!imageDialog) return
    setImageBusy(true)
    setImageError(null)
    try {
      if (imageDialog.mode === 'edit') {
        const selected = selectedMedia(editor)
        if (!selected || !replaceSelectedMedia(editor, { ...selected.image.attrs, alt: imageDialog.alt }, imageDialog.caption)) {
          throw new Error('Select the image again and retry')
        }
      } else {
        if (!imageFile) throw new Error('Choose an image file')
        const media = await uploadMediaFile(imageFile)
        const attrs = {
          src: media.publicUrl,
          alt: imageDialog.alt,
          width: media.width,
          height: media.height,
          loading: 'lazy',
        }
        if (imageDialog.mode === 'add') {
          editor.chain().focus().insertContent(imageNodeJson(attrs, imageDialog.caption)).run()
        } else if (!replaceSelectedMedia(editor, attrs, imageDialog.caption)) {
          throw new Error('Select the image again and retry')
        }
      }
      setImageDialog(null)
      setImageFile(null)
      if (imageInputRef.current) imageInputRef.current.value = ''
    } catch (error) {
      setImageError(error instanceof Error ? error.message : 'Could not update the image')
    } finally {
      setImageBusy(false)
    }
  }

  const removeSelectedImage = () => {
    const selected = selectedMedia(editor)
    if (!selected) return
    editor.view.dispatch(editor.state.tr.delete(selected.pos, selected.pos + selected.node.nodeSize))
    editor.commands.focus()
  }

  return (
    <div className="mt-1 overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-brand-primary">
      <div className="flex flex-wrap border-b border-gray-200 bg-gray-50" role="toolbar" aria-label="Text formatting">
        <ToolbarButton label="Paragraph" active={toolbarState?.paragraph} onClick={() => editor.chain().focus().setParagraph().run()}>
          <Pilcrow size={17} />
        </ToolbarButton>
        <ToolbarButton label="Heading 2" active={toolbarState?.heading2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton label="Heading 3" active={toolbarState?.heading3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={18} />
        </ToolbarButton>
        <ToolbarButton label="Bold" active={toolbarState?.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={17} />
        </ToolbarButton>
        <ToolbarButton label="Italic" active={toolbarState?.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={17} />
        </ToolbarButton>
        <ToolbarButton label="Link" active={toolbarState?.link} onClick={setLink}>
          <Link2 size={17} />
        </ToolbarButton>
        <ToolbarButton label="Bullet list" active={toolbarState?.bulletList} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton label="Ordered list" active={toolbarState?.orderedList} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton label="Blockquote" active={toolbarState?.blockquote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={17} />
        </ToolbarButton>
        <ToolbarButton label="Add image" onClick={() => openImageDialog('add')}>
          <ImagePlus size={17} />
        </ToolbarButton>
        <ToolbarButton label="Edit image details" disabled={!toolbarState?.imageSelected} onClick={() => openImageDialog('edit')}>
          <SquarePen size={17} />
        </ToolbarButton>
        <ToolbarButton label="Replace image" disabled={!toolbarState?.imageSelected} onClick={() => openImageDialog('replace')}>
          <RefreshCw size={17} />
        </ToolbarButton>
        <ToolbarButton label="Remove image" disabled={!toolbarState?.imageSelected} onClick={removeSelectedImage}>
          <Trash2 size={17} />
        </ToolbarButton>
        <ToolbarButton label="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <Table2 size={17} />
        </ToolbarButton>
        <ToolbarButton label="Delete table" disabled={!toolbarState?.canDeleteTable} onClick={() => editor.chain().focus().deleteTable().run()}>
          <Trash2 size={17} />
        </ToolbarButton>
        <ToolbarButton label="Undo" disabled={!toolbarState?.canUndo} onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 size={17} />
        </ToolbarButton>
        <ToolbarButton label="Redo" disabled={!toolbarState?.canRedo} onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 size={17} />
        </ToolbarButton>
      </div>
      <div className="rich-text-editor max-h-[60vh] overflow-auto">
        <EditorContent editor={editor} />
      </div>
      {imageDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="image-dialog-title">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <h2 id="image-dialog-title" className="text-lg font-semibold text-gray-900">
              {imageDialog.mode === 'add' ? 'Add image' : imageDialog.mode === 'replace' ? 'Replace image' : 'Image details'}
            </h2>
            <div className="mt-5 space-y-4">
              {imageDialog.mode !== 'edit' && (
                <label className="block text-sm font-medium text-gray-700">
                  Image file
                  <input
                    ref={imageInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    type="file"
                    onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                  />
                </label>
              )}
              <label className="block text-sm font-medium text-gray-700">
                Alt text
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  maxLength={500}
                  value={imageDialog.alt}
                  onChange={(event) => setImageDialog({ ...imageDialog, alt: event.target.value })}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Caption
                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  value={imageDialog.caption}
                  onChange={(event) => setImageDialog({ ...imageDialog, caption: event.target.value })}
                />
              </label>
              {imageError && <p className="text-sm text-red-700">{imageError}</p>}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700" disabled={imageBusy} type="button" onClick={closeImageDialog}>
                Cancel
              </button>
              <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50" disabled={imageBusy} type="button" onClick={() => void submitImageDialog()}>
                {imageBusy ? 'Uploading...' : imageDialog.mode === 'edit' ? 'Save details' : 'Upload image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}