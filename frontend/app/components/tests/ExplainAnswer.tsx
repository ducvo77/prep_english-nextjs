"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export default function ExplainAnswer({ explain }: { explain: string }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Accordion
        animate={CUSTOM_ANIMATION}
        open={open}
        icon={
          open ? <MdArrowDropUp size={30} /> : <MdArrowDropDown size={30} />
        }
      >
        <AccordionHeader
          onClick={handleOpen}
          className="text-sm font-normal text-primary hover:text-primary border-none p-0 justify-start"
        >
          Trích đoạn chứa đáp án
        </AccordionHeader>
        <AccordionBody className="p-0">
          <p className="text-gray-900 text-sm font-normal p-0 text-justifytr">
            {explain}
          </p>
        </AccordionBody>
      </Accordion>
    </>
  );
}
