import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { isAuthorized } from "@/lib/admin-auth";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Allowed: JPG, PNG, WebP, GIF" },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large. Max 10MB." },
                { status: 400 }
            );
        }

        // Ensure upload directory exists
        await mkdir(UPLOAD_DIR, { recursive: true });

        // Generate unique filename
        const ext = file.name.split(".").pop() || "jpg";
        const slug = file.name
            .replace(/\.[^.]+$/, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .slice(0, 40);
        const filename = `${slug}-${Date.now()}.${ext}`;
        const filepath = join(UPLOAD_DIR, filename);

        // Write file
        const bytes = await file.arrayBuffer();
        await writeFile(filepath, Buffer.from(bytes));

        // Return public URL
        const url = `/uploads/${filename}`;

        return NextResponse.json({
            url,
            filename,
            width: 800,  // default dimensions — could use sharp for real detection
            height: 600,
        });
    } catch (err) {
        console.error("Upload failed:", err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
