# AI Image Generation Guide for YooVee Product Photography

A comprehensive guide for creating professional lifestyle images of YooVee fingerless gloves using AI tools.

---

## Table of Contents

1. [Overview](#overview)
2. [Local Solutions (Recommended)](#local-solutions-recommended)
3. [Cloud-Based Alternatives](#cloud-based-alternatives)
4. [Recommended Workflow](#recommended-workflow)
5. [Training Your Own LoRA](#training-your-own-lora)
6. [Prompt Examples](#prompt-examples)
7. [Hardware Requirements](#hardware-requirements)
8. [Resources & Tutorials](#resources--tutorials)

---

## Overview

For e-commerce product photography, AI image generation can create:
- **Lifestyle shots** - Products shown in real-world use scenarios
- **Model photography** - Products worn by AI-generated models
- **Background variations** - Same product, different environments
- **Marketing assets** - Social media, ads, banners

### Why Train a Custom Model?

Generic AI models don't know what your specific product looks like. By training a custom LoRA (Low-Rank Adaptation) on your actual gloves, the AI learns to accurately reproduce:
- Exact color and material texture
- Stitching details and branding
- Proper fit and proportions

---

## Local Solutions (Recommended)

Running AI locally gives you unlimited generations, complete privacy, and no ongoing costs.

### FLUX (Best Quality)

| Aspect | Details |
|--------|---------|
| **Model** | FLUX.1 Dev or FLUX.1 Schnell |
| **Quality** | State-of-the-art photorealism |
| **Speed** | ~30 seconds per image (RTX 4090) |
| **Best For** | Professional product photography |

**Download:** [FLUX on Hugging Face](https://huggingface.co/black-forest-labs/FLUX.1-dev)

### Stable Diffusion XL

| Aspect | Details |
|--------|---------|
| **Model** | SDXL 1.0 or SDXL Turbo |
| **Quality** | Excellent, slightly below FLUX |
| **Speed** | ~10-15 seconds per image |
| **Best For** | Faster iteration, lower VRAM |

**Download:** [SDXL on Hugging Face](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)

### ComfyUI (Recommended Interface)

Node-based workflow system that works with both FLUX and SDXL.

**Features:**
- Visual workflow builder
- Batch processing
- Custom pipelines
- LoRA integration
- Inpainting support

**Install:** [ComfyUI GitHub](https://github.com/comfyanonymous/ComfyUI)

---

## Cloud-Based Alternatives

If you prefer not to run locally or need quick results:

| Service | Price | Specialty | Best For |
|---------|-------|-----------|----------|
| [Flair.ai](https://flair.ai/) | $10/mo | Product lifestyle photos | Quick background changes |
| [SellerPic](https://www.sellerpic.ai/) | Various | AI fashion models | Diverse model representation |
| [Claid.ai](https://claid.ai/) | $15/mo | Background generation, batch | High-volume processing |
| [Pebblely](https://pebblely.com/) | $19/mo | 40+ pre-made themes | Easy drag-and-drop |
| [Photoroom](https://www.photoroom.com/) | $12/mo | Background removal & replacement | Simple edits |

### When to Use Cloud Services

- Need results immediately (no setup time)
- Don't have capable hardware
- One-off projects
- Testing concepts before investing in local setup

---

## Recommended Workflow

### Step 1: Photograph Your Product

Take 15-25 high-quality photos of your YooVee gloves:

**Requirements:**
- Resolution: 1024x1024 minimum (higher is better)
- Format: PNG or high-quality JPEG
- No blur, noise, or compression artifacts

**Shot List:**
- [ ] Front view (palm up)
- [ ] Front view (palm down)
- [ ] Back view
- [ ] Side views (left and right)
- [ ] 45-degree angles
- [ ] Close-up of stitching/details
- [ ] Close-up of fingertips
- [ ] Flat lay
- [ ] On a hand (various poses)
- [ ] Different lighting conditions

### Step 2: Train Your LoRA

Use one of these tools:

| Tool | Difficulty | Notes |
|------|------------|-------|
| [Kohya_ss](https://github.com/bmaltais/kohya_ss) | Medium | Most control, industry standard |
| [FLUXGYM](https://github.com/cocktailpeanut/fluxgym) | Easy | Simplified interface |
| [OneTrainer](https://github.com/Nerogar/OneTrainer) | Medium | Good documentation |

**Training Parameters (FLUX LoRA):**

```
Rank: 48 (good for products)
Learning Rate: 1e-4
Steps: 500-1000
Batch Size: 1-2
Resolution: 1024x1024
Optimizer: AdamW8bit
```

### Step 3: Generate Images

Load your trained LoRA into ComfyUI and generate:

```
Prompt structure:
[trigger word] [product description] [scene/context] [style modifiers]

Example:
"yoovee gloves, grey fingerless gloves worn by woman gardening in sunny backyard, natural lighting, lifestyle photography, high quality"
```

### Step 4: Post-Processing

- Touch up any artifacts in Photoshop/GIMP
- Color correct to match your brand
- Crop and resize for different platforms

---

## Training Your Own LoRA

### Dataset Preparation

1. **Collect Images**
   - 15-25 photos of your product
   - Various angles and lighting
   - Clean, focused, high-resolution

2. **Crop and Resize**
   - Center the product in frame
   - Resize to 1024x1024 (FLUX) or 768x768 (SDXL)
   - Maintain 1:1 aspect ratio

3. **Create Captions**

   Each image needs a text file with the same name:

   ```
   glove-front.png
   glove-front.txt → "yoovee grey fingerless gloves, front view, product photo"
   ```

### Training with Kohya_ss

1. Install Kohya_ss:
   ```bash
   git clone https://github.com/bmaltais/kohya_ss.git
   cd kohya_ss
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

2. Prepare folder structure:
   ```
   training_data/
   ├── 10_yoovee gloves/
   │   ├── image1.png
   │   ├── image1.txt
   │   ├── image2.png
   │   ├── image2.txt
   │   └── ...
   ```

   The `10_` prefix means 10 repeats per epoch.

3. Configure training:
   - Model: FLUX.1 Dev
   - LoRA Rank: 48
   - Learning Rate: 1e-4
   - Steps: 800
   - Save every: 200 steps

4. Run training (~2-4 hours on RTX 4090)

### Training with FLUXGYM (Easier)

1. Install:
   ```bash
   git clone https://github.com/cocktailpeanut/fluxgym
   cd fluxgym
   pip install -r requirements.txt
   python app.py
   ```

2. Open web interface at `http://localhost:7860`

3. Upload images and captions

4. Click "Train" and wait

---

## Prompt Examples

### Lifestyle Photography

```
yoovee gloves, woman wearing grey fingerless gloves while driving car,
hands on steering wheel, sunny day, lifestyle photography, natural lighting,
sharp focus, high quality
```

```
yoovee gloves, elderly woman gardening wearing grey fingerless gloves,
planting flowers in backyard, morning light, lifestyle shot, warm colors,
professional photography
```

```
yoovee gloves, man cycling wearing grey fingerless gloves, gripping handlebars,
outdoor cycling path, athletic lifestyle, action shot, dynamic composition
```

### Product Focus

```
yoovee gloves, grey fingerless gloves laid flat on white marble surface,
soft natural lighting, minimalist product photography, clean background,
e-commerce style, high detail
```

```
yoovee gloves, close-up of grey fingerless gloves texture and stitching,
macro photography, studio lighting, product detail shot, premium quality
```

### Social Media

```
yoovee gloves, hands holding coffee cup wearing grey fingerless gloves,
cozy cafe setting, instagram aesthetic, warm tones, lifestyle content,
shallow depth of field
```

### Negative Prompts

Always include to avoid common issues:

```
blurry, low quality, distorted fingers, extra fingers, missing fingers,
deformed hands, bad anatomy, watermark, text, logo, oversaturated,
underexposed, grainy, noisy
```

---

## Hardware Requirements

### Minimum (SDXL)

| Component | Requirement |
|-----------|-------------|
| GPU | NVIDIA RTX 3060 (12GB VRAM) |
| RAM | 32GB |
| Storage | 50GB free (SSD recommended) |
| OS | Windows 10/11 or Linux |

### Recommended (FLUX)

| Component | Requirement |
|-----------|-------------|
| GPU | NVIDIA RTX 4080/4090 (16GB+ VRAM) |
| RAM | 64GB |
| Storage | 100GB free SSD |
| OS | Windows 10/11 or Linux |

### Training Requirements

| Component | Requirement |
|-----------|-------------|
| GPU | 12GB+ VRAM (24GB ideal) |
| RAM | 64GB (training uses system RAM heavily) |
| Storage | 200GB+ free |

---

## Resources & Tutorials

### Video Tutorials

- [FLUX LoRA Training Complete Guide](https://www.youtube.com/results?search_query=flux+lora+training+tutorial)
- [ComfyUI Beginner's Guide](https://www.youtube.com/results?search_query=comfyui+beginner+tutorial)
- [Product Photography with AI](https://www.youtube.com/results?search_query=ai+product+photography+tutorial)

### Written Guides

- [How to Train Flux LoRA Models](https://stable-diffusion-art.com/train-flux-lora/) - Step-by-step guide
- [Flux LoRA Training in ComfyUI 2025](https://apatero.com/blog/flux-lora-training-comfyui-complete-guide-2025) - Comprehensive walkthrough
- [Using Flux LoRA in ComfyUI](https://www.nextdiffusion.ai/tutorials/how-to-use-flux-lora-in-comfyui) - Usage after training
- [Building Custom LoRAs](https://learn.thinkdiffusion.com/building-better-models-flux-loras-in-comfyui/) - Advanced techniques

### Communities

- [r/StableDiffusion](https://www.reddit.com/r/StableDiffusion/) - Active community
- [Civitai](https://civitai.com/) - Model sharing and inspiration
- [ComfyUI Discord](https://discord.gg/comfyui) - Technical help

### Model Downloads

- [FLUX.1 Dev](https://huggingface.co/black-forest-labs/FLUX.1-dev) - Main model
- [SDXL Base](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0) - Alternative
- [Text Encoders for FLUX](https://huggingface.co/comfyanonymous/flux_text_encoders) - Required files

---

## Quick Start Checklist

- [ ] Install ComfyUI
- [ ] Download FLUX.1 Dev model
- [ ] Download required text encoders (t5xxl, clip_l)
- [ ] Take 15-25 product photos
- [ ] Write captions for each image
- [ ] Install Kohya_ss or FLUXGYM
- [ ] Train LoRA (~2-4 hours)
- [ ] Load LoRA in ComfyUI
- [ ] Generate lifestyle images
- [ ] Post-process and use!

---

## Cost Comparison

| Approach | Initial Cost | Ongoing Cost | Images/Month |
|----------|--------------|--------------|--------------|
| Local (owned hardware) | $0 | ~$5 electricity | Unlimited |
| Local (new RTX 4090) | ~$2,500 | ~$5 electricity | Unlimited |
| Flair.ai | $0 | $10/mo | ~100 |
| Claid.ai | $0 | $15/mo | ~150 |
| Professional Photography | $500-2000/shoot | Per shoot | 20-50 |

**Recommendation:** If you have capable hardware or plan to create many images over time, local generation pays for itself quickly.

---

*Last updated: December 2025*
