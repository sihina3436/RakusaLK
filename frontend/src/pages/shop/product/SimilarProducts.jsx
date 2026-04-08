import { useGetAllProductsQuery } from "../../../redux/products/productApi";
import ProductCard from "../ProductCard";

const SimilarProducts = ({ currentProductId, categoryId }) => {
  const { data: products = [], isLoading } = useGetAllProductsQuery();

  if (isLoading) return null;

  const similarProducts = products
    .filter((p) => {
      const productCategoryId =
        typeof p.category === "object"
          ? p.category._id
          : p.category;

      return (
        p._id !== currentProductId &&
        productCategoryId === categoryId
      );
    })
    .slice(0, 4);

  if (!similarProducts.length) return null;

  return (
    <div>
      <h2 className="text-2xl text-yellow-400 mb-6">
        Similar Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((p, i) => (
          <ProductCard key={p._id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;