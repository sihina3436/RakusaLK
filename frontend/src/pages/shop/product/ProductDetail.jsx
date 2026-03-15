import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import SimilarProducts from "./SimilarProducts";

import { useGetProductByIdQuery } from "../../../redux/products/productApi";
import ProductReviews from "./ProductReviews";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } =
    useGetProductByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-yellow-400">
        Loading Product...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  /* ================================
     NORMALIZE DATA SAFELY
  ================================= */
  const formattedProduct = {
    ...product,
    category:
      typeof product.category === "object"
        ? product.category.name
        : product.category || "",
    sizes: product.sizesAvailable || [],
    colors: product.colors || [],
  };

  console.log("Fetched Product Data:", formattedProduct);

  console.log("Fetched Product ID:", formattedProduct._id);
  console.log("Fetched Category ID:", formattedProduct.category?._id);

  return (
    <div className="bg-black min-h-screen text-white px-6 lg:px-16 py-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-yellow-400 mb-8"
      >
        <ChevronLeft size={18} />
        Back
      </button>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-2 gap-10">
        <ProductGallery
          images={product.images || []}
          productName={product.name}
        />

        <ProductInfo product={formattedProduct} />
      </div>

      <ProductReviews productId={product._id} user={product.user} />

      {/* SIMILAR PRODUCTS */}
      <div className="mt-16">
        <SimilarProducts
          currentProductId={product._id}
          categoryId={product.category?._id}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
