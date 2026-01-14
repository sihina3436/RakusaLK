import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import ProductGallery from "./ProductGallery.jsx";
import ProductInfo from "./ProductInfo.jsx";
import SimilarProducts from "./SimilarProducts.jsx";
import ProductReviews from "./ProductReviews.jsx";
import { products } from "../../../components/products.js";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-black px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md"
        >
          <h1 className="font-serif text-3xl text-yellow-500 mb-3">
            Product Not Found
          </h1>
          <p className="text-white/70 mb-6 text-sm">
            The product you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-2.5 bg-yellow-500 text-black font-semibold rounded-md
                       hover:bg-yellow-400 transition-colors tracking-wide"
          >
            Back to Shop
          </button>
        </motion.div>
      </section>
    );
  }

  const productImages =
    product.images && product.images.length > 0 ? product.images : [];

  return (
    <div className="bg-black min-h-screen text-white px-24 py-20">
      {/* Breadcrumb */}
      <section className="bg-black">
        <div className="pt-8 px-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-yellow-300
                       hover:text-yellow-500 transition-colors"
          >
            <ChevronLeft size={24} />
            Back
          </button>
        </div>
      </section>

      {/* Product Section */}
      <section className="bg-black">
        <div className="pl-10 py-10 mx-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl mx-auto lg:mx-0"
            >
              <ProductGallery
                images={productImages}
                productName={product.name}
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="max-w-xl mx-auto lg:mx-0"
            >
              <ProductInfo product={product} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-black">
        <div className="container-luxury px-4 py-10 mx-20">
          <ProductReviews productId={product._id} />
        </div>
      </section>

      {/* Similar Products */}
      <section className="bg-black border-t border-yellow-500/10">
        <div className="container-luxury px-6 py-12 mx-12">
          <SimilarProducts
            currentProductId={product._id}
            category={product.category}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
