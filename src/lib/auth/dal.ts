import 'server-only'

import { cache } from "react";
import { cookies } from "next/headers";
import { auth } from './auth';

export const verifySession = cache(async () => {

    const cookieStore = await cookies();
    const headers = new Headers();

    headers.set("Cookie", cookieStore.toString());

    const session = await auth.api.getSession({ headers });

    if(!session?.user.id) return null

    return { isAuth: true, userId: session.user.id!}
})