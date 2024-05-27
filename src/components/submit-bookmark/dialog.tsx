'use client'

import { useState } from 'react'
import { SendIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SubmitBookmarkForm } from '@/components/submit-bookmark/form'
import { Button } from '../ui/button'
import { SUBMIT_BOOKMARK_FORM_DESCRIPTION, SUBMIT_BOOKMARK_FORM_TITLE } from '@/constants'

export const SubmitBookmarkDialog = ({ bookmarks, currentBookmark }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='xs' className='relative'>
          <SendIcon size={16} className='mr-2' />
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{SUBMIT_BOOKMARK_FORM_TITLE}</DialogTitle>
          <DialogDescription>{SUBMIT_BOOKMARK_FORM_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        {/* <SubmitBookmarkForm
          setFormOpen={setOpen}
          bookmarks={bookmarks}
          currentBookmark={currentBookmark}
        /> */}
      </DialogContent>
    </Dialog>
  )
}
