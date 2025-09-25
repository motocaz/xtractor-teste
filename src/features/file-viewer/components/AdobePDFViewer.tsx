'use client'

import React, { useEffect, useRef } from 'react'
import Script from 'next/script'

interface AdobePDFViewerProps {
    clientId: string
    fileUrl?: string
    localFile?: File
    fileName: string
}

const AdobePDFViewer: React.FC<AdobePDFViewerProps> = ({ clientId, fileUrl, localFile, fileName }) => {
    const viewerRef = useRef<HTMLDivElement>(null)
    const adobeViewer = useRef<any>(null)

    useEffect(() => {
        if (!window.AdobeDC) {
            document.addEventListener('adobe_dc_view_sdk.ready', initializeViewer)
        } else {
            initializeViewer()
        }

        return () => {
            document.removeEventListener('adobe_dc_view_sdk.ready', initializeViewer)
        }
    }, [clientId, fileUrl, localFile, fileName])

    const initializeViewer = () => {
        if ((!fileUrl && !localFile) || !viewerRef.current) {
            return
        }

        if (adobeViewer.current) {
            // Viewer is already initialized
            return
        }

        const adobeDCView = new window.AdobeDC.View({ clientId, divId: viewerRef.current.id })
        adobeViewer.current = adobeDCView

        const content = localFile
            ? { promise: localFile.arrayBuffer(), fileName: localFile.name }
            : { location: { url: fileUrl! } }

        adobeDCView.previewFile(
            {
                content,
                metaData: { fileName: fileName },
            },
            {
                embedMode: 'IN_LINE',
                showPrintPDF: true,
                showDownloadPDF: true,
            }
        )
    }

    return (
        <>
            <Script src="https://acrobatservices.adobe.com/view-sdk/viewer.js" strategy="lazyOnload" />
            <div id="adobe-dc-view" ref={viewerRef} style={{ height: '80vh' }} />
        </>
    )
}

export default AdobePDFViewer
