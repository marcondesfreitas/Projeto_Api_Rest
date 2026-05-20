import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// 🔥 params NÃO é Promise
type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  const { id } = params;

  const client = await prisma.client.findUnique({
    where: { id },
  });

  return Response.json(client);
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  const { id } = params;
  const body = await req.json();

  const updated = await prisma.client.update({
    where: { id },
    data: body,
  });

  return Response.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const { id } = params;

  await prisma.client.delete({
    where: { id },
  });

  return Response.json({ ok: true });
}
