import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload"

cloudinary.config({
    cloud_name: 'dvyyqvj8m',
    api_key: '924949763683962',
    api_secret: 'C7RhLdH0SsZ4ve7kapfRN8SUGMs',
    secure: true
})

describe('tests on fileUpload', () => {

    test('should upload the file correctly to cloudinary', async () => {

        const imageUrl = 'https://i.redd.it/byrc80qqqah81.jpg'
        const res = await fetch(imageUrl)
        const blob = await res.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)

        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')

        await cloudinary.api.delete_resources(['journal-app/' + imageId])
    })

    test('should return null', async () => {

        const file = new File([], 'foto.jpg')
        const url = await fileUpload(file)

        expect(url).toBe(null)

    })
})