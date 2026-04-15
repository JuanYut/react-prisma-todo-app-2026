import { prisma } from "../db.js";

export const getAllNotes = async () => {
  return await prisma.note.findMany();
};

export const createNote = async (text) => {
  return await prisma.note.create({
    data: { text },
  });
};

export const updateNote = async (id, data) => {
  return await prisma.note.update({
    where: { id },
    data,
  });
};

export const deleteNote = async (id) => {
  return await prisma.note.delete({
    where: { id },
  });
};
