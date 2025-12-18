import React from 'react';

export default function ProgressBar({ label, progress }) {
    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            {/* Green arrow container */}
            <div style={{
                position: 'relative',
                display: 'inline-block',
                height: '40px',
                lineHeight: '40px',
                color: 'white',
                fontWeight: 'bold',
                paddingLeft: '20px',
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))'
            }}>
                {/* Main box part of the arrow */}
                <div style={{
                    backgroundColor: '#4CAF50',
                    display: 'inline-block',
                    height: '100%',
                    paddingRight: '10px',
                    paddingLeft: '10px'
                }}>
                    {label}
                </div>

                {/* Triangle tip */}
                <div style={{
                    position: 'absolute',
                    right: '-20px',
                    top: 0,
                    width: 0,
                    height: 0,
                    borderTop: '20px solid transparent',
                    borderBottom: '20px solid transparent',
                    borderLeft: '20px solid #4CAF50'
                }} />

                {/* Progress track background (faint gray line extending to the right) - Optional visual cue */}
                <div style={{
                    position: 'absolute',
                    left: '100%',
                    top: '50%',
                    width: '300px', /* arbitrary width to fill space */
                    height: '10px',
                    background: '#f5f5f5',
                    zIndex: -1,
                    transform: 'translateY(-50%)'
                }}></div>
            </div>
        </div>
    );
}
