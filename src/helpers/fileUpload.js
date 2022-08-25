export const fileUpload = async (file) => {

    if (!file) throw new Error('The file is missing')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dvyyqvj8m/upload'
    const formData = new FormData()

    formData.append('upload_preset', 'react-course-journal')
    formData.append('file', file)

    try {

        const res = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (!res.ok) throw new Error("could't upload")

        const cloudResp = await res.json()

        return cloudResp.secure_url

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }

}