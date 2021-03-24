import React from 'react'

const MODAL_STYLES = {
    LARGE: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '800px',
        height: '1000px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, .9)',
        zIndex: 1000
    },
    SMALL: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, .9)',
        zIndex: 1000
    }
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

const Modal = ({ open, children, onClose }) => {
    if (!open) return null;

    return (
        <>

            <div style={OVERLAY_STYLES} onClick={onClose}/>
            <div style={window.matchMedia("(max-width: 600px)").matches ? (
                MODAL_STYLES.SMALL
            ) : MODAL_STYLES.LARGE}>
                {children}
            </div>
        </>
    )
}

export default Modal

