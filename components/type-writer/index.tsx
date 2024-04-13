"use client";

import {
  CursorProps,
  Typewriter,
  TypewriterProps,
} from "react-simple-typewriter";

type ComponentProps = {
  /** Show / Hide the cursor */
  cursor?: boolean;
} & TypewriterProps &
  CursorProps;

export default function TypeWriter({
  words,
  loop,
  typeSpeed,
  deleteSpeed,
  delaySpeed,
  cursor,
  cursorStyle,
  cursorColor,
  cursorBlinking,
  onLoopDone,
  onType,
  onDelay,
  onDelete,
}: ComponentProps) {
  return (
    <Typewriter
      words={words}
      loop={loop}
      typeSpeed={typeSpeed}
      deleteSpeed={deleteSpeed}
      delaySpeed={delaySpeed}
      cursor={cursor}
      cursorStyle={cursorStyle}
      cursorColor={cursorColor}
      cursorBlinking={cursorBlinking}
      onLoopDone={onLoopDone}
      onType={onType}
      onDelay={onDelay}
      onDelete={onDelete}
    />
  );
}
