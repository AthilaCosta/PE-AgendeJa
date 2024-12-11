import { Modal } from "antd";
import { IModal } from "./interface";

export function GenericModal({
  title,
  openModal,
  setOpenModal,
  footer,
  body,
  size,
}: IModal) {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        style={{ minWidth: size === "large" ? "700px" : "520px" }}
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
