import { Modal } from "antd";
import { IModal } from "./interface";

export function GenericModal({
  title,
  openModal,
  setOpenModal,
  footer,
  body,
}: IModal) {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        centered={true}
        footer={footer}
        title={title}
        open={openModal}
        onCancel={handleCloseModal}
      >
        {body}
      </Modal>
    </div>
  );
}
