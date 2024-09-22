import { dataSource } from '~/dataSource'
import { Products } from './../models/entity/products'

interface Image {
  url: string
  colorShow: string
  colorName: string
  // Other fields in the product model
}

class AppServices {
  async getProductServices() {
    const productsList: Products[] = await dataSource
      .getRepository(Products)
      .createQueryBuilder('product')
      .leftJoin('product.gender', 'genders')
      .addSelect(['genders.name'])
      .leftJoinAndSelect('product.collection', 'collections')
      .leftJoin('product.brand', 'brand')
      .addSelect(['brand.name'])
      .leftJoinAndSelect('product.style', 'productstyle')
      .leftJoinAndSelect('product.color', 'productColor') // Alias for product.color
      .leftJoinAndSelect('product.image', 'productimages')
      .leftJoinAndSelect('productimages.colorId', 'imageColor') // Alias for productimages.colorId
      .getMany()

    //convert product.imageId to an array of [Image]
    const transformImageData = productsList.map((product: Products) => {
      console.log(product.image)
      return {
        ...product,
        gender: product.gender?.name,
        brand: product.brand?.name,
        collection: product.collection?.name,
        style: product.style?.name,
        color: product.color?.name,
        image: product.image?.map((item: any) => ({
          url: item.url,
          colorShow: item.colorShow,
          colorName: item.colorId.name
        }))
      }
    })

    let emptyObject: { [key: string]: Image[] } = {}
    // convert array ofImage group by colorName
    transformImageData.forEach((data: any) => {
      data['image'].forEach((data2: Image) => {
        if (emptyObject[data2.colorName]) {
          emptyObject[data2.colorName].push(data2)
        } else {
          emptyObject[data2.colorName] = [data2]
        }
      })
      data['image'] = emptyObject
      emptyObject = {}
    })

    return transformImageData
  }
}
const appServices = new AppServices()
export default appServices
