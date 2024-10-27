import { Modal } from 'antd';
import { IModal } from './interface';
import styles from "./Modal.module.css"

export function GenericModal({ title, openModal, setOpenModal, footer }: IModal) {

    const handleOk = () => {
        setOpenModal(false);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <div className={styles["modal"]}>
            <Modal centered={true} footer={footer} title={title} open={openModal} onOk={handleOk} onCancel={handleCancel}>
                
            </Modal>
        </div>
    );
};