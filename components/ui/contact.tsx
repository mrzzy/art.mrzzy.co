/*
 * art.mrzzy.co
 * UI component
 * Contact Drawer
 */

"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./button";
import { ArrowUpRight, Copy, X } from "lucide-react";
import { useToast } from "./use-toast";
import Link from "next/link";

/**
 * Renders a drawer component displaying contact information.
 * @param props.trigger Optional. If specified shows a trigger that opens the drawer.
 * @param props.triggerClassName Optional. If specified shows a trigger that opens the drawer.
 * @param props.open Optional. If specified, automatically opens the drawer.
 * @param props.dark Optional. Whether to render in dark mode
 */
export default function Contact(props: {
  trigger?: string;
  triggerClassName?: string;
  open?: boolean;
  dark?: boolean;
}) {
  const { toast } = useToast();
  const email = "art@mrzzy.co";
  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    toast({ title: "Email copied" });
  };
  return (
    <Drawer open={props.open}>
      <DrawerTrigger className={props.triggerClassName}>
        {props.trigger ?? "Contact"}
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <h1 className="font-serif font-bold text-6xl">Lets Connect</h1>
          <p>Reach out via the following avenues.</p>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex flex-row gap-x-4">
            <div className="text-lg">
              <h3 className="font-bold text-xl">Email</h3>
              <span>{email}</span>
              <Button
                onClick={copyEmail}
                variant="outline"
                className="border-0 focus-visible:ring-0 mx-1 px-2 !py-0 active:bg-slate-400"
              >
                <Copy size={14} />
              </Button>
            </div>
            <div className="text-lg">
              <h3 className="font-bold text-xl">Instagram</h3>
              <Link
                className="relative top-1 hover:border-b border-slate-600"
                href="https://www.instagram.com/_mr.zzy_"
              >
                @_mr.zzy_ <ArrowUpRight size={14} className="inline" />
              </Link>
            </div>
          </div>
          <DrawerClose>
            <Button variant="outline">
              <X />
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
