import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app/data/theme.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading theme data:', error);
    return NextResponse.json(
      { error: 'Failed to load theme' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedTheme = await request.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedTheme, null, 2));
    return NextResponse.json(updatedTheme);
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    );
  }
} 