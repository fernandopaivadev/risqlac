package services

import (
	"main/infra"
	"main/models"
)

type productService struct{}

var Product productService

func (*productService) Create(product *models.Product) error {
	result := infra.Database.Instance.Create(&product)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*productService) Update(product *models.Product) error {
	result := infra.Database.Instance.Model(&product).Updates(models.Product{
		Name:            product.Name,
		Synonym:         product.Synonym,
		Class:           product.Class,
		Subclass:        product.Subclass,
		Storage:         product.Storage,
		Incompatibility: product.Incompatibility,
		Precautions:     product.Precautions,
		Symbols:         product.Symbols,
		Batch:           product.Batch,
		DueDate:         product.DueDate,
		Location:        product.Location,
		Quantity:        product.Quantity,
	})

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (*productService) GetByID(productID uint64) (models.Product, error) {
	var product models.Product

	result := infra.Database.Instance.First(&product, productID)

	if result.Error != nil {
		return models.Product{}, result.Error
	}

	return product, nil
}

func (*productService) List() ([]models.Product, error) {
	var products []models.Product

	result := infra.Database.Instance.Find(&products)

	if result.Error != nil {
		return []models.Product{}, result.Error
	}

	return products, nil
}

func (*productService) Delete(productID uint64) error {
	result := infra.Database.Instance.Delete(&models.Product{}, productID)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
