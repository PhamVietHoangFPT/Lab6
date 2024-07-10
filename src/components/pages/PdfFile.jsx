import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Document, Page, PDFViewer, View, Text, Image } from '@react-pdf/renderer'
export default function PdfFile() {
  const { id } = useParams()
  const [dataDetail, setDataDetail] = useState([])
  const [base64Image, setBase64Image] = useState(null)
  useEffect(() => {
    fetch(`https://663e59f4e1913c47679763a2.mockapi.io/orchids/${id}`)
      .then(response => (
        response.json()
      ))
      .then(data => setDataDetail(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  useEffect(() => {
    if (dataDetail && dataDetail.image) {
      toBase64(dataDetail.image, function (base64Image) {
        // Assuming there's a state to hold the base64 image
        setBase64Image(base64Image);
      });
    }
  }, [dataDetail]);

  function toBase64(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  return (
    <PDFViewer width="100%" height="1000" >
      <Document title={dataDetail.name}>
        <Page size="A4">
          <View>
            <Text>{dataDetail.name}</Text>
            <Text>{dataDetail.color}</Text>
            <Text>{dataDetail.rating}</Text>
            <Text>{dataDetail.origin}</Text>
            <Text>{dataDetail.category}</Text>
            <Text>{dataDetail.isSpecial ? 'Yes' : 'No'}</Text>
            <Text>{dataDetail.editedBy}</Text> {/* Corrected property name to camelCase */}
            {/* Assuming Image component from @react-pdf/renderer is imported */}
            {base64Image && <Image src={base64Image} />}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
