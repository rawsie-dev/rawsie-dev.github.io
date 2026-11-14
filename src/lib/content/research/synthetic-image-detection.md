---
title: "MattaruNet: Lightweight Synthetic Image Detection Using Contrastive Distilled Learning"
date: "2026-11-10"
description: "Exploring embed pinpointing, contrastive distillation, and lightweight convolutional networks for synthetic image detection."
status: "Completed"
authors:
  - "Ngoc-Tuan Nguyen"
  - "Phuc-Nguyen Lam-Gia"
  - "Nhat-Khai Hoang"
  - "Duc-Nghi Hoang"
  - "Hai-Dang Nguyen"
tags:
  - Computer Vision
  - Deep Learning
  - CNN
  - Knowledge Distillation
  - Contrastive Learning
  - Synthetic Image Detection
  - MediaEval
links:
  - name: Paper
    url: https://2025.multimediaeval.com/paper31.pdf
featured: false
hidden: false
summary: |
  MattaruNet explores lightweight AI-generated image detection via contrastive distilled learning. Using "embed pinpointing"—guiding a minimal two-layer student CNN with a pretrained EfficientNet teacher's embedding space—our best model (MattaruNetB1) reached 75.70% accuracy and 77.61% F1 on the evaluation set, outperforming a 51.30% baseline. However, severe performance drops on unseen test data exposed critical bottlenecks in student capacity, asymmetric guidance, and cross-distribution generalization. Published at the MediaEval 2025 Workshop.
---

# Overview

Modern generative models produce images nearly indistinguishable from real photographs, yet most synthetic-image detectors rely on heavy architectures or brittle handcrafted forensic features. For our submission to the **MediaEval 2025 Synthetic Images Task**, we asked a simpler question:

> **Can a minimal convolutional neural network learn to detect synthetic images by borrowing representational knowledge from a pretrained vision backbone?**

We call our framework **embed pinpointing**. Rather than forcing a tiny student network to learn visual features from scratch, we anchor it to the embedding space of a pretrained EfficientNet teacher—pulling real images toward natural-image representations while pushing synthetic samples apart via contrastive distillation.

Our core research questions were:
1. How far can a 2-layer CNN go when guided by a larger pretrained teacher?
2. Does an existing real-image embedding space serve as an effective reference for spotting fakes?
3. How does teacher scale (EfficientNet-B0 vs. B1 vs. B2) affect student performance and out-of-distribution generalization?

---

# Architecture & Method

My primary contributions focused on building the data-processing and evaluation pipelines, running the core experiments, and analyzing why the models behaved the way they did.

### 1. Teacher–Student Setup & Embed Pinpointing

Instead of deploying a heavy backbone at inference, we used ImageNet-pretrained **EfficientNet (B0, B1, and B2)** models strictly as frozen training guides for a tiny student network consisting of **two convolutional layers, a dense layer, and a binary classification head**.

```text
                        Input Image
                             |
               +-------------+-------------+
               |                           |
               |                   Data Augmentation
               |                           |
               v                           v
        Pretrained Teacher            Student CNN
         (EfficientNet)             (2 Conv Layers)
               |                           |
               v                           v
       Teacher Embedding           Student Embedding
               |                           |
               |             +-------------+-------------+
               |             |                           |
               +------+------+                           |
                      |                                  |
                      v                                  v
               Distillation &                     Classification
               Contrastive Loss                        Head
                      |                                  |
                      |                                  v
                      |                            Detection Loss
                      |                                  |
                      +----------------+-----------------+
                                       |
                                       v
                                  Total Loss

```

### 2. Contrastive Distillation Objective

We trained the student using three signals:

* **Distillation Loss:** Aligns the student's embeddings with the teacher's on real images to preserve natural-image structure and reduce false positives.
* **Contrastive Loss:** Pushes synthetic-image embeddings away from the real-image reference space.
* **Classification Loss:** Binary cross-entropy on the student's classification head to optimize directly for detection.

The combined objective balances representation learning against direct classification:

$$\mathcal{L} = \alpha \mathcal{L}_{\text{contrast}} + (1 - \alpha)\mathcal{L}_{\text{classification}}, \quad 0 \leq \alpha \leq 1$$

We kept $\alpha$ fixed for `MattaruNetB0`–`B2`, and tested a multiplicative decay schedule (`MattaruB2V2`) to gradually shift focus toward classification. To prevent overfitting to dataset-specific artifacts, we also applied runtime augmentations (random flips, rotation, zoom, translation, color jitter, and Gaussian noise).

**Stack:** Python, PyTorch, NumPy, EfficientNet (ImageNet-pretrained), Custom 2-Layer CNN.

---

# Results

We compared our models against a standalone 2-layer CNN baseline (`CNN-2`) across both the organizers' evaluation split and an unseen test set.

### Evaluation Set

| Model | Accuracy | Real Prec. | Real Recall | Fake Prec. | Fake Recall | F1 |
| --- | --- | --- | --- | --- | --- | --- |
| CNN-2 (Baseline) | 51.30% | 49.90% | 47.90% | 52.51% | 54.50% | 53.49% |
| MattaruNetB0 | 67.21% | 61.90% | 76.18% | 71.17% | 55.63% | 62.45% |
| **MattaruNetB1** | **75.70%** | **77.23%** | 72.90% | 75.66% | **79.66%** | **77.61%** |
| MattaruNetB2 | 74.36% | 72.88% | **75.37%** | **75.92%** | 73.46% | 74.67% |

On the evaluation distribution, contrastive distillation worked dramatically well: **MattaruNetB1 jumped +24.40 percentage points in accuracy** over the baseline (75.70% vs. 51.30%). Notably, scaling the teacher from B1 to B2 yielded no further gains.

### Unseen Test Set

| Model | Accuracy | Real Prec. | Real Recall | Fake Prec. | Fake Recall | F1 |
| --- | --- | --- | --- | --- | --- | --- |
| **MattaruNetB0** | **53.07%** | **52.51%** | 64.16% | **53.95%** | **41.98%** | **47.22%** |
| MattaruNetB1 | 49.73% | 49.80% | **66.02%** | 49.60% | 33.44% | 39.95% |
| MattaruNetB2 | 48.70% | 49.02% | 65.28% | 48.06% | 32.12% | 38.50% |

On unseen data, performance collapsed—and revealed two telling patterns:

1. **Heavy "Real" Bias:** MattaruNetB1 maintained 66.02% recall on real images, but fake recall dropped to 33.44%.
2. **Inverse Scaling:** The smallest teacher (`MattaruNetB0`) generalized best on unseen data, while larger backbones suffered worse degradation—likely due to input-resolution and capacity mismatches between teacher and student.

---

# Failure Analysis & Takeaways

Investigating why strong validation numbers failed to transfer became the most valuable part of this project:

* **Student Capacity Bottleneck:** Two convolutional layers proved too narrow to capture generalizable forensic cues, pushing the student to rely on dataset-specific shortcuts.
* **Asymmetric Guidance:** Real images had an explicit teacher anchor, whereas synthetic images only had a repulsive contrastive signal—naturally biasing the embedding space toward predicting "real."
* **Loss Instability:** Mixing cosine similarity and Euclidean distance in the distillation/contrastive formulation introduced competing optimization signals.
* **Benchmarks Aren't Enough:** High in-distribution accuracy (75.70%) masked severe brittleness across different image generators and post-processing pipelines.

### Future Directions

If revisiting this architecture, four adjustments stand out:

1. **Slightly deeper students** (e.g., adding residual blocks) to find the sweet spot between speed and expressiveness.
2. **Symmetric dual-pathway guidance**, giving both real and synthetic classes explicit representation targets.
3. **Cleaner loss formulations** using unified distance metrics and better teacher–student resolution alignment.
4. **Cross-generator benchmarks** as the primary evaluation standard rather than single-split validation.

---

# Project Information

Published at the **MediaEval 2025 Workshop** (Synthetic Images Task).

- **Authors:** Ngoc-Tuan Nguyen, Phuc-Nguyen Lam-Gia, Nhat-Khai Hoang, Duc-Nghi Hoang, and Hai-Dang Nguyen
- **Period:** June 2025 – November 2025
- **Role:** Co-author
- **Affiliations:** VNU-HCM High School for the Gifted; University of Science, VNU-HCM
- **Paper:** [Mattaru Net: Lightweight synthetic images detection using contrastive distilled learning](https://2025.multimediaeval.com/paper31.pdf)
