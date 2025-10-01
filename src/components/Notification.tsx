'use client';

import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/utils/util';
import { cva, VariantProps } from 'class-variance-authority';
import { CircleX, Info, CircleSlash, TriangleAlert, CircleCheckBig } from 'lucide-react';
import { useRef, useState } from 'react';

const containerStyles = cva('flex px-3 py-2 items-center justify-between ', {
  variants: {
    type: {
      success: 'bg-emerald-200',
      error: 'bg-red-200',
      info: 'bg-cyan-200',
      warning: 'bg-amber-200',
    },
    size: {
      small: 'rounded-md w-[30%]',
      medium: 'rounded-lg w-[50%]',
      large: 'rounded-xl w-[70%]',
    },
  },
  defaultVariants: {
    type: 'info',
    size: 'medium',
  },
});

type ButtonVariants = VariantProps<typeof containerStyles>;

const iconMap: Record<ButtonVariants['type'] & string, typeof Info> = {
  success: CircleCheckBig,
  info: Info,
  warning: TriangleAlert,
  error: CircleSlash,
};

const posMap = {
  topLeft: {
    pop: { initial: { top: -60, left: 20 }, entry: { top: 40 } },
    slide: { initial: { top: 20, left: -800 }, entry: { left: 20 } },
  },
  topRight: {
    pop: { initial: { top: 20, left: -800 }, entry: { left: 20 } },
    slide: { initial: { top: 20, left: -800 }, entry: { left: 20 } },
  },
  bottomLeft: {
    pop: { initial: { top: 20, left: -800 }, entry: { left: 20 } },
    slide: { initial: { top: 20, left: -800 }, entry: { left: 20 } },
  },
  bottomRight: {
    pop: { initial: { top: 20, left: -800 }, entry: { left: 20 } },
    slide: { initial: { top: 20, left: -800 }, entry: { left: 20 } },
  },
};

const Notification = ({
  type,
  size,
  text = 'notification',
  onClick = () => {},
  position = 'topLeft',
  animation = 'slide',
  delay = 3,
}: ButtonVariants & {
  text?: string;
  onClick?: () => void;
  position?: keyof typeof posMap;
  animation?: keyof (typeof posMap)['topLeft'];
  delay?: number;
}) => {
  const Icon = iconMap[type || 'info'];
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          layout
          style={{ position: 'absolute' }}
          initial={{ ...posMap[position][animation].initial, opacity: 0 }}
          animate={{ ...posMap[position][animation].entry, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
          exit={{
            ...posMap[position][animation].initial,
            opacity: 0,
            transition: { duration: 0.8, type: 'spring', bounce: 0 },
          }}
          className={cn('border border-amber-800', containerStyles({ type, size }))}
        >
          <div>
            <Icon />
          </div>
          <div className="px-2 py-1">{text}</div>
          <div>
            <CircleX
              onClick={() => {
                onClick();
                setVisible(false);
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
