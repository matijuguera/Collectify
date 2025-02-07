import { NextResponse } from 'next/server';
import { SetRepository } from '../repositories/Sets';
import { SetService } from '../services/SetsService';

const setService = new SetService(new SetRepository());

export async function GET() {
    try {
        const sets = await setService.listSets();
        return NextResponse.json(sets);
    } catch {
        return NextResponse.json
        ({ error:  " "}, { status: 404 });

        ;
    }
}

export async function POST(request: Request) {
try {

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const photo = formData.get("photo") as File;
    const theme_id = formData.get("theme_id") as string;

    if (!name || !theme_id) {
    return NextResponse.json(
        { error: " " },
        { status: 404 }
    );
    }

    if (!photo || photo.size === 0) {
    return NextResponse.json(
        { error: " " },
        { status: 404 }
    )}

    const arrayBuffer = await photo.arrayBuffer();
    const photoBuffer = Buffer.from(arrayBuffer);

    const set = await setService.createSet(name, photoBuffer, theme_id);
    return NextResponse.json(set, { status: 201 });
} catch (error) {
    console.error(" ", error);
    return NextResponse.json(
    { error: " " + (error as Error).message },
    { status: 404 }
    );
}
}