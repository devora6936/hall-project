export const PhotoService = {
   
    getData() {
        return [
            {
                itemImageSrc: './pictures/1.jpg',
                thumbnailImageSrc: './pictures - Copy/1.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },

            {
                itemImageSrc: './pictures/3.jpg',
                thumbnailImageSrc: './pictures - Copy/3.jpg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: './pictures/4.jpg',
                thumbnailImageSrc: './pictures - Copy/4.jpg',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },
            {
                itemImageSrc: './pictures/1.jpg',
                thumbnailImageSrc: './pictures - Copy/1.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },

            {
                itemImageSrc: './pictures/3.jpg',
                thumbnailImageSrc: './pictures - Copy/3.jpg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: './pictures/4.jpg',
                thumbnailImageSrc: './pictures - Copy/4.jpg',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },            {
                itemImageSrc: './pictures/1.jpg',
                thumbnailImageSrc: './pictures - Copy/1.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },

            {
                itemImageSrc: './pictures/3.jpg',
                thumbnailImageSrc: './pictures - Copy/3.jpg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: './pictures/4.jpg',
                thumbnailImageSrc: './pictures - Copy/4.jpg',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },

        ];
    },

    getImages() {
        return Promise.resolve(this.getData());
    }
};