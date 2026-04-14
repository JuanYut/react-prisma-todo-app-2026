import { prisma } from "../db.js";

/**
 * Main handler to manage Note-related requests
 * Acts as a router and controller for the Note entity
 */
export async function handleNotes(req) {
  const url = req.path;
  const method = req.method;

  // Extract body processed by Express middleware
  const body = req.body;

  // Detect if the path includes a numeric ID (/notes/1) using Regex
  const idMatch = url.match(/^\/notes\/(\d+)$/);
  const noteId = idMatch ? parseInt(idMatch[1]) : null;

  // 1. GET /notes - List all notes from the database
  if (method === "GET" && url === "/notes") {
    const notes = await prisma.note.findMany();
    return {
      status: 200,
      body: notes,
    };
  }

  // 2. POST /notes - Create a new note
  if (method === "POST" && url === "/notes") {
    if (!body || !body.text) {
      return {
        status: 400,
        body: { error: "Text is required" },
      };
    }

    const note = await prisma.note.create({
      data: { text: body.text },
    });

    return {
      status: 200,
      body: note,
    };
  }

  // Logic for routes requiring a specific ID
  if (noteId) {
    // 3. PATCH /notes/:id - Update an existing note (Edit or Archive)
    if (method === "PATCH") {
      const { text, archived } = body; // Usamos la constante body definida arriba

      const updatedNote = await prisma.note.update({
        where: { id: noteId },
        data: {
          // Spread objects only if the property is defined in the request
          ...(text !== undefined && { text }),
          ...(archived !== undefined && { archived }),
        },
      });

      return { status: 200, body: updatedNote };
    }

    // 4. DELETE /notes/:id - Remove a note from the database
    if (method === "DELETE") {
      await prisma.note.delete({
        where: { id: noteId },
      });

      return { status: 200, body: { message: "Note deleted successfully" } };
    }
  }

  // Default response if no route or method matches
  return { status: 404, body: { error: "Not found" } };
}
