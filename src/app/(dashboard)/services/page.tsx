"use client";

import { useState } from "react";
import { Trash2, Pencil, Tag, Percent, Plus } from "lucide-react";
import GbModal from "@/forms/GBModal";

const dummyServices = [
  {
    _id: "1",
    title: "Wash & Iron",
    pricePerItem: 3.5,
    pickupPrice: 1,
    deliveryPrice: 1,
    isActive: true,
  },
  {
    _id: "2",
    title: "Wash Only",
    pricePerItem: 2.0,
    pickupPrice: 1,
    deliveryPrice: 1,
    isActive: true,
  },
  {
    _id: "3",
    title: "Iron Only",
    pricePerItem: 1.5,
    pickupPrice: 1,
    deliveryPrice: 1,
    isActive: true,
  },
  {
    _id: "4",
    title: "Dry Clean",
    pricePerItem: 8.0,
    pickupPrice: 1,
    deliveryPrice: 1,
    isActive: true,
  },
];

const dummyOffers = [
  {
    _id: "1",
    title: "Summer Special",
    discountValue: 20,
    discountType: "percentage",
    promoCode: "SUMMER20",
    isActive: true,
  },
  {
    _id: "2",
    title: "First Time User",
    discountValue: 10,
    discountType: "fixed",
    promoCode: "WELCOME",
    isActive: false,
  },
];

type TService = (typeof dummyServices)[0];
type TOffer = (typeof dummyOffers)[0];

// ── Shared input style ─────────────────────────────────────────
const inputClass =
  "w-full border-b border-gray-200 py-2.5 text-sm text-gray-600 placeholder-gray-300 focus:outline-none focus:border-primary transition bg-transparent";

// ── Image upload row ──────────────────────────────────────────
const ImageUploadRow = () => (
  <div className="flex items-center justify-between border-b border-gray-200 py-2.5">
    <span className="text-sm text-gray-300">Upload Image</span>
    <button
      type="button"
      className="text-gray-300 hover:text-primary transition"
    >
      <svg
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
        <path d="M3 15l5-5 4 4 3-3 6 6" strokeWidth="1.5" />
      </svg>
    </button>
  </div>
);

// ── Service Form ──────────────────────────────────────────────
const ServiceForm = ({
  initial,
  onSubmit,
  submitLabel,
}: {
  initial?: Partial<TService>;
  onSubmit: (d: Partial<TService>) => void;
  submitLabel: string;
}) => {
  const [form, setForm] = useState({
    title: initial?.title || "",
    pricePerItem: initial?.pricePerItem || "",
    pickupPrice: initial?.pickupPrice || "",
    deliveryPrice: initial?.deliveryPrice || "",
  });
  return (
    <div className="flex flex-col gap-1">
      <input
        className={inputClass}
        placeholder="Enter Service Tittle"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Enter Service Price/Items"
        type="number"
        value={form.pricePerItem}
        onChange={(e) => setForm({ ...form, pricePerItem: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Enter pickup  price"
        type="number"
        value={form.pickupPrice}
        onChange={(e) => setForm({ ...form, pickupPrice: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Enter Delivery Price"
        type="number"
        value={form.deliveryPrice}
        onChange={(e) => setForm({ ...form, deliveryPrice: e.target.value })}
      />
      <ImageUploadRow />
      <input
        className={inputClass}
        placeholder="Offer % (Optional)"
        type="number"
      />
      <button
        onClick={() => onSubmit(form as Partial<TService>)}
        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg text-sm font-medium transition mt-3"
      >
        {submitLabel}
      </button>
    </div>
  );
};

// ── Offer Form ────────────────────────────────────────────────
const OfferForm = ({
  initial,
  onSubmit,
  submitLabel,
}: {
  initial?: Partial<TOffer>;
  onSubmit: (d: Partial<TOffer>) => void;
  submitLabel: string;
}) => {
  const [form, setForm] = useState({
    title: initial?.title || "",
    discountValue: initial?.discountValue || "",
  });
  return (
    <div className="flex flex-col gap-1">
      <input
        className={inputClass}
        placeholder="Promotion Tittle"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Enter Discount (%)"
        type="number"
        value={form.discountValue}
        onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
      />
      <ImageUploadRow />
      <button
        onClick={() => onSubmit(form as Partial<TOffer>)}
        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg text-sm font-medium transition mt-3"
      >
        {submitLabel}
      </button>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────
const ServicesPage = () => {
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [editService, setEditService] = useState<TService | null>(null);
  const [addOfferOpen, setAddOfferOpen] = useState(false);
  const [editOffer, setEditOffer] = useState<TOffer | null>(null);

  return (
    <div className="flex flex-col gap-5">
      {/* ── Service Offerings ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Tag size={15} className="text-primary" /> Service Offerings
          </h2>
          <button
            onClick={() => setAddServiceOpen(true)}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Plus size={14} /> Add Service
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {dummyServices.map((s) => (
            <div
              key={s._id}
              className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 text-sm">
                    {s.title}
                  </span>
                  <span className="px-2.5 py-0.5 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {}}
                    className="text-red-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button
                    onClick={() => setEditService(s)}
                    className="text-gray-400 hover:text-primary transition"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-2.5">
                Pick Up Price ${s.pickupPrice} & Delivery Price $
                {s.deliveryPrice}
              </p>
              <p className="text-primary font-bold text-sm">
                ${s.pricePerItem.toFixed(2)}
                <span className="text-gray-400 font-normal text-xs">
                  / per item
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Offer & Discounts ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Percent size={15} className="text-primary" /> Offer & Discounts
          </h2>
          <button
            onClick={() => setAddOfferOpen(true)}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Plus size={14} /> Add Offer
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {dummyOffers.map((o) => (
            <div
              key={o._id}
              className="border border-gray-100 rounded-xl p-4 bg-white relative hover:shadow-sm transition"
            >
              {/* action buttons top right */}
              <div className="flex justify-end gap-2 mb-2">
                <button className="text-red-400 hover:text-red-500 transition">
                  <Trash2 size={14} />
                </button>
                <button
                  onClick={() => setEditOffer(o)}
                  className="text-gray-400 hover:text-primary transition"
                >
                  <Pencil size={14} />
                </button>
              </div>

              {/* inactive badge */}
              {!o.isActive && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2">
                  <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium">
                    INACTIVE
                  </span>
                </div>
              )}

              {/* image area */}
              <div className="w-full h-22.5 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  stroke="#1A9FAA"
                  viewBox="0 0 24 24"
                  strokeOpacity="0.5"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    strokeWidth="1.5"
                  />
                  <path d="M3 15l5-5 4 4 3-3 6 6" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800 text-sm">
                  {o.title}
                </span>
                <span className="text-primary font-bold text-sm">
                  {o.discountType === "percentage"
                    ? `${o.discountValue}% OFF`
                    : `$${o.discountValue} OFF`}
                </span>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                {o.promoCode}
              </span>
            </div>
          ))}

          {/* Add New Promotion */}
          <button
            onClick={() => setAddOfferOpen(true)}
            className="border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition min-h-40"
          >
            <Plus size={22} strokeWidth={1.5} />
            <span className="text-sm">Add New Promotion</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <GbModal
        isOpen={addServiceOpen}
        onClose={() => setAddServiceOpen(false)}
        title="Add Service"
      >
        <ServiceForm
          onSubmit={() => setAddServiceOpen(false)}
          submitLabel="Add Service"
        />
      </GbModal>
      <GbModal
        isOpen={!!editService}
        onClose={() => setEditService(null)}
        title="Edit Service"
      >
        <ServiceForm
          initial={editService || {}}
          onSubmit={() => setEditService(null)}
          submitLabel="Update Service"
        />
      </GbModal>
      <GbModal
        isOpen={addOfferOpen}
        onClose={() => setAddOfferOpen(false)}
        title="Add Offer"
      >
        <OfferForm
          onSubmit={() => setAddOfferOpen(false)}
          submitLabel="Add Offer"
        />
      </GbModal>
      <GbModal
        isOpen={!!editOffer}
        onClose={() => setEditOffer(null)}
        title="Edit Offer"
      >
        <OfferForm
          initial={editOffer || {}}
          onSubmit={() => setEditOffer(null)}
          submitLabel="Update Offer"
        />
      </GbModal>
    </div>
  );
};

export default ServicesPage;
