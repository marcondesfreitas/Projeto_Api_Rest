import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  const favorites = await prisma.favorite.findMany({
    where: { clientId: clientId || undefined },
  });

  return Response.json(favorites);
}

export async function POST(req: Request) {
  const body = await req.json();

  const favorite = await prisma.favorite.create({
    data: {
      clientId: body.clientId,
      productId: body.productId,
    },
  });

  return Response.json(favorite);
}