'use client'

import { useActionState } from 'react'
import { createBlogPost } from '@/app/actions'

export function BlogPostForm() {
  const [state, action, isPending] = useActionState(createBlogPost, {})

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border">
      <h3 className="text-lg font-medium text-foreground mb-4">Create New Blog Post</h3>
      
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full rounded-lg border border-input bg-input/20 text-foreground placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-ring sm:text-sm px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-foreground">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            required
            className="mt-1 block w-full rounded-lg border border-input bg-input/20 text-foreground placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-ring sm:text-sm px-3 py-2 outline-none resize-none"
          />
        </div>

        {state.error && <p className="text-sm text-destructive">{state.error}</p>}
        {state.success && <p className="text-sm text-emerald-500">{state.message}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center rounded-lg border border-transparent bg-primary hover:bg-primary-hover py-2 px-4 text-sm font-medium text-primary-foreground shadow-md disabled:opacity-50 transition-colors"
        >
          {isPending ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  )
}
