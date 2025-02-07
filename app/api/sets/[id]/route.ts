import { NextResponse } from 'next/server';
import { SetRepository } from '../../repositories/Sets';
import { SetService } from '../../services/SetsService';

const setService = new SetService(new SetRepository());

export async function GET( 
    request: Request,
    { params }:  { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const set = await setService.getSet(id);
        if (!set) {
            return NextResponse.json({}, { status: 404 });
        }

        return NextResponse.json(set);
    } catch (error) {
        return NextResponse.json(
            { error: "Error getting set: " + (error as Error).message },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }:  { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
    const existingSet = await setService.getSet(id);
    if (!existingSet) {
        return NextResponse.json({}, { status: 404 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const photo = formData.get("photo") as File;

    if (!name) {
        return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
        );
    }

    const arrayBuffer = await photo.arrayBuffer();
    const uint8ArrayPhoto = new Uint8Array(arrayBuffer);

    const updatedSet = await setService.updateSet(id, name, uint8ArrayPhoto);
    return NextResponse.json(updatedSet);
    } catch (error) {
        return NextResponse.json(
        { error: "Error updating set: " + (error as Error).message },
        { status: 500 }
    );
    }
}

export async function DELETE(
    request: Request,
    { params }:  { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
    const existingSet = await setService.getSet(id);
    if (!existingSet) {
        return NextResponse.json({ error: "Set not found" }, { status: 404 });
    }

    await setService.deleteSet(id);

    return new NextResponse(null, { status: 204 });
    } catch (error) {
    console.error("Error deleting set ", error);
    return NextResponse.json(
        { error: "Error deleting set " + (error as Error).message },
        { status: 500 }
    );
    }
}