import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../../../components/products.js";
import ProductCard from "../ProductCard.jsx";

const SimilarProducts = ({ currentProductId, category }) => {

  const similarProducts = products
    .filter(
      (p) =>
        p._id !== currentProductId &&
        p.category &&
        category &&
        p.category._id === category._id
    )
    .slice(0, 4);

  if (similarProducts.length === 0) {
    const otherProducts = products
      .filter((p) => p._id !== currentProductId)
      .slice(0, 4);

    return (
      <section className="section-padding bg-cream">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-serif text-2xl md:text-3xl mb-2 text-white">
                You May Also Like
              </h2>
              <p className="text-muted-foreground text-white">
                Explore more from our collection
              </p>
            </div>

            <Link
              to="/shop"
              className="text-sm uppercase tracking-[0.2em] underline-animation hidden md:block"
            >
              View All
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherProducts.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-cream">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-serif text-2xl md:text-3xl mb-2">
              Similar Products
            </h2>
            <p className="text-muted-foreground">
              More from {category?.name}
            </p>
          </div>

          <Link
            to={`/shop?category=${category?._id}`}
            className="text-sm uppercase tracking-[0.2em] underline-animation hidden md:block"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {similarProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
