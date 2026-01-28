"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuSubmenu() {
    const router = useRouter()
    const [label, setLabel] = useState("Open Menu")

    const items = [
  { path: "/protected/care-instructions", label: "Care Instructions" },
  { path: "/protected/case-history", label: "Case History" },
  { path: "/protected/tasks", label: "Tasks To-Do" },
  { path: "/protected/parentage", label: "Parentage" },
];

    const navigateTo = (path: string, newLabel: string) => {
    setLabel(newLabel)   // Update the button text
    router.push(path)    // Change the page
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Changed to "Menu" for a cleaner nav look */}
        <Button  variant="ghost" className="h-8 px-8 text-lg min-w-[360px]" >
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigateTo("/protected/care-instructions", "Care Instructions")}>
            Care Instructions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/protected/case-history", "Case History")}>
            Case History
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Tasks</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {/* create is for superadmin only */}
                <DropdownMenuItem onClick={() => navigateTo("/protected/tasks/create", "Create")}>Create</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateTo("/protected/tasks/modify", "Modify")}>Modify</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

{/* needs to be for superadmin only */}
          <DropdownMenuItem onClick={() => navigateTo("/protected/parentage", "Parentage")}>
            Parentage
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/protected/schedule", "Schedule for Case")}>
            Schedule for Case
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/protected/take-note", "Take a Note")}>
            Take a Note
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/protected/to-do", "To-Do")}>
            To-Do
          </DropdownMenuItem>
             
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}