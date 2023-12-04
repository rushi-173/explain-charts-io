import { ReactElement } from 'react';

type ModalProps = {
    isOpen?: boolean;
    onClose?: () => void;
    children?: any;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative z-50 bg-white p-4 rounded-md shadow-md">
                        <button
                            className="absolute top-0 right-0 p-2 cursor-pointer"
                            onClick={onClose}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
