"use client";

import { createEvent } from "react-event-hook";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
import IconXMark from "@/components/icons/x-mark";
import Loader from "@/components/os/lightbox/loader";

export interface LightboxImage {
  src: string;
  title: string;
}

const showLightBox = createEvent("onShowLightBox")<LightboxImage>();

export function showLightBoxImage(image: LightboxImage) {
  showLightBox.emitOnShowLightBox(image);
}

export default function Lightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<LightboxImage | null>(null);
  const [loading, setLoading] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  showLightBox.useOnShowLightBoxListener((image) => {
    setLoading(true);
    setImage(image);
    openModal();
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative"
          style={{ zIndex: 999 }}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          </Transition.Child>

          <div className="overflow-none fixed inset-0 h-96">
            <div className="flex items-center justify-center pt-6 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform rounded-md border-2 border-sky-500 bg-white/60 p-2 text-left align-middle shadow-md transition-all">
                  <Dialog.Title as="div" className="flex p-0">
                    <div className="flex-1">{image?.title}</div>
                    <div
                      className="flex h-6 w-6 flex-none items-center justify-center rounded-tr-sm hover:bg-red-500/50"
                      onClick={() => closeModal()}
                    >
                      <IconXMark />
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    {loading && (
                      <div className="flex h-max items-center justify-center p-6">
                        <Loader />
                      </div>
                    )}
                    {image && (
                      <Image
                        src={image ? image.src : ""}
                        width={1200}
                        height={1200}
                        alt={image?.title || "Lightbox Image"}
                        className={`max-h-[calc(100vh-100px)] w-full object-contain rounded-md ${loading ? "hidden" : "visible"}`}
                        priority={true}
                        onLoad={(e) => {
                          setLoading(false);
                        }}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
