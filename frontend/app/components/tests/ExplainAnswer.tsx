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

export default function ExplainAnswer() {
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
          className="text-sm font-normal text-blue-700 hover:text-blue-700 border-none p-0 justify-start"
        >
          Trích đoạn chứa đáp án
        </AccordionHeader>
        <AccordionBody className="p-0">
          <p className="text-gray-900 text-sm font-normal p-0l">
            Right, so now I want to ask you some questions about how you
            travelled here today. Did you use public transport? Yes. I came by
            bus. OK. And that was today. Its the 24th of April, isnt it? Isnt it
            the 25th? No, actually, youre right.
          </p>
        </AccordionBody>
      </Accordion>
    </>
  );
}
