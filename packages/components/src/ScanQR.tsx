import { getQR } from '@sindric-lib-ui/endpoints';
import React from 'react';

import styled from 'styled-components'

export const ScanQR: React.FC<{[key:string]: any}> = ({name, event, gaSecret}) => {
    return(
        <ScanQRWrapper>
            <div className="uppercase"><h5 className="center">Two Factor Authentication Setup</h5></div>
            <div className="center mt-3">Scan QR Code</div>
            <div className="flex space-around profile_2fa_qr_wrapper md-no-flex mt-2">
                <div className={`profile_2fa_qr`}>
                    <img src={`${localStorage.getItem("base_url")}${getQR}`}></img>
                </div>
                <div className={`profile_2fa_content light-intro label`}>
                    Please Download A Two Factor Authentication App Such as Google Authenticator and Scan the QR Code
                </div>
            </div>
            <div className="mt-2 center manual_2fa">
                <div className="">or</div>
                <div className="">Configure Manually</div>
                <div className={`profile_2fa_manual_details mt-1`}>
                    <table className="profile_2fa_manual_table">
                        <tbody>
                            <tr className={`profile_2fa_manual_row`}><td className="light-intro">ACCOUNT:</td></tr>
                            <tr className={`profile_2fa_manual_row`}><td>{{name}}</td></tr>
                            <tr className={`profile_2fa_manual_row`}><td className="light-intro">GA SECRET:</td></tr>
                            <tr className={`profile_2fa_manual_row`}><td>{gaSecret}</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className={`profile_2fa_submit-button mt-3`} onClick={event}>
                    <button
                        type="button"
                        className={`btn btn-sm btn-black mt-2`}
                        onClick={(ev) => event()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </ScanQRWrapper>
    );
}

const ScanQRWrapper = styled.div`
    .profile_2fa_qr_wrapper{
        display: flex;
        justify-content: space-around;
        .profile_2fa_content{
            width: 50%;
            color: #fff;
            color: var(--font-color);
            line-height: 2rem;
            padding-top: 2rem;
            font-size: 1.67rem;            
            letter-spacing: .1em;
            text-align: left;
        }
    }
    .profile_2fa_manual_table {
        margin: 0 auto;
        border: 1px solid;
        padding: 0;
        border-collapse: collapse;
        tr{
            border: 1px solid;
        }
    }
`;