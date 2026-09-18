/**
 * Incremental parser for Server-Sent Events data frames.
 *
 * Network reads may end in the middle of a line or JSON value, so callers
 * must retain the unfinished tail between reads. This parser owns that state
 * and only returns complete `data:` payloads.
 */
export class SSEDataParser {
  private buffer = "";

  push(chunk: string): string[] {
    this.buffer += chunk;
    return this.drainCompleteEvents();
  }

  finish(): string[] {
    const events = this.drainCompleteEvents();
    const trailing = this.buffer.trim();
    this.buffer = "";

    if (!trailing) return events;
    const payload = parseDataBlock(trailing);
    return payload === null ? events : [...events, payload];
  }

  private drainCompleteEvents(): string[] {
    const events: string[] = [];

    while (true) {
      const boundary = this.buffer.match(/\r?\n\r?\n/);
      if (!boundary || boundary.index === undefined) break;

      const block = this.buffer.slice(0, boundary.index);
      this.buffer = this.buffer.slice(boundary.index + boundary[0].length);

      const payload = parseDataBlock(block);
      if (payload !== null) events.push(payload);
    }

    return events;
  }
}

function parseDataBlock(block: string): string | null {
  const dataLines = block
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).replace(/^ /, ""));

  return dataLines.length > 0 ? dataLines.join("\n") : null;
}
