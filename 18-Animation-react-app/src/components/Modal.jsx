import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  // const hidden = { y: 100, opacity: 0 };
  // const visible = { y: 0, opacity: 1 };
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        variants={{
          hidden: { y: 100, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
        initial={'hidden'}
        animate={'visible'}
        exit={'hidden'}
        transition={{ duration: 1 }}
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
