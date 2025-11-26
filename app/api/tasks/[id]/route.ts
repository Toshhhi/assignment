import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { getAuthUser } from '@/lib/auth';
import { updateTaskSchema } from '@/lib/validation';
import mongoose from 'mongoose';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUser(req);
    
    if (!authUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    await connectDB();
    const task = await Task.findOne({ _id: id, userId: authUser.userId });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        task: {
          id: task._id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get task error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUser(req);
    
    if (!authUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const validationResult = updateTaskSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    await connectDB();
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: authUser.userId },
      { $set: validationResult.data },
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Task updated successfully',
        task: {
          id: task._id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update task error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUser(req);
    
    if (!authUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    await connectDB();
    const task = await Task.findOneAndDelete({ _id: id, userId: authUser.userId });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Task deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete task error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

