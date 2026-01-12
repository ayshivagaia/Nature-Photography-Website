
import React from 'react';
import { motion } from 'framer-motion';
import { Photo } from '../types';
import { Camera, Focus, Aperture } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <motion.div
      layout
      initial={{ filter: 'blur(20px)', opacity: 0, scale: 0.95 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="masonry-item relative group overflow-hidden bg-moss border border-white/5 cursor-crosshair"
    >
      <img
        src={photo.url}
        alt={photo.title}
        className="w-full transition-all duration-700 ease-in-out group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-moss/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-lichen text-xs uppercase tracking-widest font-sans mb-2 block">
            {photo.category}
          </span>
          <h3 className="text-2xl font-serif text-silver italic mb-4">
            {photo.title}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <Camera className="w-3 h-3 text-lichen" />
              <span className="text-[10px] font-sans tracking-tighter uppercase text-silver/60">
                {photo.metadata.focalLength}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Aperture className="w-3 h-3 text-lichen" />
              <span className="text-[10px] font-sans tracking-tighter uppercase text-silver/60">
                {photo.metadata.aperture}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Focus className="w-3 h-3 text-lichen" />
              <span className="text-[10px] font-sans tracking-tighter uppercase text-silver/60">
                {photo.metadata.shutter}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-lichen flex items-center justify-center text-[7px] text-lichen">
                ISO
              </div>
              <span className="text-[10px] font-sans tracking-tighter uppercase text-silver/60">
                {photo.metadata.iso}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
