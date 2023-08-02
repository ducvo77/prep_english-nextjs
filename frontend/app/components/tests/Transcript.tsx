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

export default function Transcript() {
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
          <p className="text-gray-900 text-sm font-normal">
            Excuse me. Would you mind if I asked you some questions? Were doing
            a survey on transport. Yes, thats OK. First of all, can I take your
            name? Yes. Its Sadie Jones. Thanks very much. And could I have your
            date of birth — just the year will do, actually. Is that all right?
            Yes, thats fine. Its 1991. So next your postcode, please. Its DW30
            7YZ. Q1 Great. Thanks. Is that in Wells? No its actually in Harborne
            — Wells isnt far from there, though. I really like that area. My
            grandmother lived there when I was akid. Yes, it is nice. Right, so
            now I want to ask you some questions about how you travelled here
            today. Did you use public transport? Yes. I came by bus. OK. And
            that was today. Its the 24th of April, isnt it? Q2 Isnt it the 25th?
            No, actually, youre right. Ha ha. And what was the reason for your
            trip today? I can see youve got some shopping with you. Yes. I did
            some shopping but the main reason I came here was to go to the
            dentist. Q3 Thats not much fun. Hope it was nothing serious. No, it
            was just a check-up. Its fine. Good. Do you normally travel by bus
            into the city centre? Yes. I stopped driving in ages ago because
            parking was so difficult to find and it Q4 costs so much. I see. The
            bus is much more convenient too. It only takes about 30 minutes.
            Thats good. So where did you start your journey? At the bus stop on
            Claxby Street. Is that C-L-A—X-B-Y? Thats right. And how satisfied
            with the service are you? Do you have any complaints? Well, as I
            said, its very convenient and quick when its on time, but this
            morning it was late. Only about 10 minutes, but still. Q6 Yes, I
            understand thats annoying. And what about the timetable? Do you have
            any comments about that? Mmm. I suppose I mainly use the bus during
            the day, but any time Ive been in town in the evening —for dinner or
            at the cinema —Ive noticed you have to waita Q7 long time for a bus
            — there arent that many. OK, thanks. So now Id like to ask you about
            your car use. Well, I have got a car but I dont use it that often.
            Mainly just to go to the supermarket. But thats about it really. My
            husband uses it at the weekends to go Q8 to the golf club. And what
            about a bicycle? I dont actually have one at the moment. What about
            the city bikes you can rent? Do you ever use those? No — Im not keen
            on cycling there because of all the pollution. But I would like to
            Q9 get a bike — it would be good to use it to get to work. MAN: So
            why havent you got one now? Well, I live in a flat — on the second
            floor and it doesnt have any storage — so Q10 wed have to leave it
            in the hall outside the flat. I see. OK. Well, I think thats all …
          </p>
        </AccordionBody>
      </Accordion>
    </>
  );
}
