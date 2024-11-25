import { Modal } from "flowbite-react";

function PopupModal({ title, showModal, handleModalToggle, children }) {
  return (
    <Modal show={showModal} position="center" onClose={handleModalToggle}>
      <Modal.Header className="py-[0.5rem] bg-primary modal__header">
        {title}
      </Modal.Header>
      <Modal.Body className="py-[1rem]">{children}</Modal.Body>
    </Modal>
  );
}

export default PopupModal;
