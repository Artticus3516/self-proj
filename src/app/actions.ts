'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type FormState = {
  message?: string
  error?: string
  success?: boolean
}

export async function submitLead(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { error: 'All fields are required' }
  }

  const supabase = await createClient()

  const { error } = await supabase.from('leads').insert({
    name,
    email,
    message,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/dashboard')
  return { success: true, message: 'Lead submitted successfully' }
}

export async function createBlogPost(prevState: FormState, formData: FormData): Promise<FormState> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) {
    return { error: 'All fields are required' }
  }

  const supabase = await createClient()

  // Verify the user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Insert the blog post
  const { error } = await supabase.from('blog_posts').insert({
    title,
    content,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/dashboard')
  return { success: true, message: 'Blog post created successfully' }
}
