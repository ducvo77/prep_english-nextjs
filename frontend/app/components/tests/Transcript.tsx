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

interface TranscriptProps {
  data: Question;
}

export default function Transcript({ data }: TranscriptProps) {
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
          className="text-base font-normal text-blue-700 hover:text-blue-700"
        >
          {open ? "Ẩn Transcript" : "Hiện Transcript"}
        </AccordionHeader>
        <AccordionBody>
          <p
            id="transcript"
            dangerouslySetInnerHTML={{ __html: data.topic.transcript }}
            key={data.id}
            className="text-gray-900 text-sm font-normal text-justify"
          />
        </AccordionBody>
      </Accordion>
    </>
  );
}
