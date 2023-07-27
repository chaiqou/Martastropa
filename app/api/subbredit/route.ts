import { getAuthSession } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { SubredditValidator } from "../../../lib/validators/subreddit";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = SubredditValidator.parse(body);

    const subbreditExists = await db.subreddit.findFirst({
      where: { name },
    });

    if (subbreditExists) {
      return new Response("Subbredit already exists", { status: 409 });
    }

    const subbredit = await db.subreddit.create({
      data: { name, creatorId: session.user.id },
    });
  } catch (error) {}
}
