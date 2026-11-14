---
title: "Exploring Brain-Inspired Functional Diversity and Competitive Sparsity in Artificial Neural Networks"
date: "2026-11-10"
description: "An investigation into biologically inspired neural network architectures, exploring neuronal functional diversity, heterogeneous activation functions, and competitive sparsity across tabular and image classification tasks."
status: "Ongoing"
authors:
  - "Phuc-Nguyen Lam-Gia"
  - "Ngoc-Tuan Nguyen"
  - "Ha-Anh Nguyen-Ngoc"
  - "Hai-Dang Nguyen"
tags:
  - Artificial Intelligence
  - Machine Learning
  - Deep Learning
  - Neural Networks
  - Computational Neuroscience
  - Computer Vision
  - Research
links:
  - name: GitHub
    url: "https://github.com/rawsie-dev/brain-inspired-neural-networks"
  - name: Manuscript
    url: "https://rawsie.dev/research/brain-inspired-nn.pdf"
featured: true
hidden: false
summary: |
  What if artificial neural networks benefited from some of the functional diversity found in biological brains?

  This research investigates three parameter-free, biologically motivated mechanisms: Multi-Activation Neurons (intra-neuron functional diversity), Neuronal Heterogeneity (inter-neuron functional diversity), and k-Winners-Take-All (kWTA) competitive sparsity.

  Over approximately six months, I led a research project evaluating these mechanisms across tabular datasets (Adult Income, Dry Bean) using an 8-layer multilayer perceptron and image benchmarks (DeepDetect-2025, Tiny ImageNet) using ConvNeXtV2-Base.

  Our experiments produced promising gains in specific vision configurations: chunked heterogeneity achieved 93.72% accuracy compared to 90.64% for the GELU baseline on DeepDetect-2025, and 75%-retention kWTA reached 50.61% compared to 49.81% on Tiny ImageNet. However, these parameter-free mechanisms introduced a 23–134% training runtime overhead and showed that efficacy depends heavily on task structure, modality, and sparsity ratios.

  This project served as an empirical reality check on how biological principles behave as practical inductive biases in modern neural network design.
---

# Overview & Motivation

Conventional neural network layers are largely homogeneous: every neuron applies the same activation function $a = \phi(Wx + b)$ and participates in dense computation. Biological nervous systems work very differently—neurons exhibit diverse firing characteristics and specializations, and only a sparse subset responds strongly to any given stimulus.

**Could introducing functional diversity and competitive sparsity into artificial neural networks improve learning and predictive performance?**

Beginning in May 2026, I led a research project at PTNK's Science and Engineering Laboratory (SELab) under the mentorship of Hai-Dang Nguyen to test this question. Rather than attempting a full-brain simulation, we translated two biological observations into three architectural modifications that introduce no additional learnable parameters, while retaining configurable hyperparameters.

---

# Architectural Mechanisms

### 1. Multi-Activation Neurons (Intra-Neuron Diversity)

Inspired by dendritic integration, each neuron evaluates ten fixed nonlinearities on its pre-activation $z = w^\top x + b$ and averages their outputs:

$$
f_{\text{MA}}(z) = \frac{1}{10}\left[0.25\,\text{ReLU}(z) + z\tanh(z) + \tanh(z) + \sigma(z) + \sin(z) + \frac{1}{z^2+1} + \text{Snake}(z) + \sigma(z)\cos(z) + \text{erf}(z) + z\sigma(z)\right]
$$

This combines five qualitative behaviors—**rectifying and unbounded** ($\text{ReLU}$, scaled by $0.25$ to moderate its contribution), **saturating** ($\tanh, \sigma, \text{erf}$), **oscillatory** ($\sin, \sigma(z)\cos(z), \text{Snake}(z)$), **localized and symmetric** ($1/(z^2+1)$), and **input-modulated** ($z\tanh(z), z\sigma(z)$)—without introducing additional learnable parameters. Averaging these diverse response curves also provides a form of functional aggregation that may smooth transitions between individual activation responses during optimization.

### 2. Neuronal Heterogeneity (Inter-Neuron Diversity)

Instead of mixing functions inside one unit, each neuron in a layer is assigned a single fixed activation $h_i = f_i(z_i)$ from $\{\text{ReLU}, \text{GELU}, \text{SiLU}, \text{Mish}\}$, pairing piecewise-linear computation with smooth input-dependent gating. We tested two initialization strategies:

- **Random Assignment:** Activations are distributed evenly and randomly shuffled once at initialization.
- **Chunked Assignment:** Neurons are divided into four contiguous blocks, each assigned one activation function to create structured functional groups.

### 3. k-Winners-Take-All (Competitive Sparsity)

Placed immediately after $\text{GELU}$ ($a = \text{GELU}(z)$), kWTA introduces lateral competition by retaining only the top $k\%$ of activations by value (without renormalization) and zeroing out the rest:

$$
a'_i =
\begin{cases}
a_i & \text{if } a_i \text{ is among the top } k\% \\
0 & \text{otherwise}
\end{cases}
$$

We tested retention levels $k \in \{75\%, 50\%, 25\%\}$ (corresponding to 25%, 50%, and 75% sparsity). In ConvNeXtV2-Base, kWTA sits between $\text{GELU}$ and Global Response Normalization (GRN), competing across channels $C$ independently at each spatial location $(b, h, w)$. During backpropagation, gradients flow strictly through winning units.

---

# Experimental Setup & Results

Using PyTorch, we evaluated these mechanisms against a standard **GELU** baseline across two distinct regimes: an **8-layer MLP** on tabular benchmarks (*Adult Income*, *Dry Bean*) and **ConvNeXtV2-Base** on image classification benchmarks (*DeepDetect-2025*, *Tiny ImageNet*).

### Key Vision Findings

**DeepDetect-2025 (Chunked Neuronal Heterogeneity):** Organizing neurons into structured activation blocks yielded a **+3.08 point** gain over the homogeneous baseline, suggesting that *how* diversity is organized matters as much as diversity itself.

<grid columns={2} gap={3}>
  <grid-item>
    <box border radius="lg" padding={3} gap={1}>
      <text color="secondary" weight="medium" size="sm">Chunked heterogeneity</text>
      <title size="2xl" color="success" tabularNums>93.72</title>
      <badge color="success">Proposed configuration</badge>
    </box>
  </grid-item>
  <grid-item>
    <box border radius="lg" padding={3} gap={1}>
      <text color="secondary" weight="medium" size="sm">GELU baseline</text>
      <title size="2xl" tabularNums>90.64</title>
      <text color="secondary" size="xs">Conventional configuration</text>
    </box>
  </grid-item>
</grid>

**Tiny ImageNet (kWTA at 75% Sparsity):** Retaining only the top 25% of activations outperformed the dense baseline by **+0.80 points**, showing that aggressive channel sparsity remains compatible with visual feature learning.

<grid columns={2} gap={3}>
  <grid-item>
    <box border radius="lg" padding={3} gap={1}>
      <text color="secondary" weight="medium" size="sm">kWTA · 75% sparsity</text>
      <title size="2xl" color="success" tabularNums>50.61</title>
      <badge color="success">Proposed configuration</badge>
    </box>
  </grid-item>
  <grid-item>
    <box border radius="lg" padding={3} gap={1}>
      <text color="secondary" weight="medium" size="sm">GELU baseline</text>
      <title size="2xl" tabularNums>49.81</title>
      <text color="secondary" size="xs">Conventional configuration</text>
    </box>
  </grid-item>
</grid>

### Trade-offs & Caveats

These gains did not generalize uniformly across tabular tasks or configurations. Moreover, while our modifications are parameter-free, custom activation branching and top-$k$ sorting introduced a **23–134% training runtime overhead**, and sparse activations do not reduce inference latency without dedicated sparse kernels.

---

# Key Takeaways & Dissemination

- **Biological inspiration $\neq$ biological equivalence:** Abstracting dendritic integration or lateral inhibition does not guarantee optimization benefits; every architectural bias has to earn its keep empirically.
- **Complexity introduces optimization friction:** Combining multiple activation curves alters gradient scales and saturation dynamics, making hyperparameter sensitivity and careful baselines critical.
- **Negative results are signal:** We submitted our manuscript, *Exploring Brain-Inspired Functional Diversity and Competitive Sparsity in Artificial Neural Networks*, to **SOICT 2026**, although it was not accepted. The submission process taught me to communicate mixed experimental results honestly, recognize methodological limitations, and distinguish promising observations from conclusions that the evidence can actually support.

---

# Future Work

- **Statistical rigor & ablations:** Run multi-seed evaluations with confidence intervals and isolate individual activation contributions.
- **Adaptive heterogeneity:** Let networks learn or dynamically reassign neuronal activation types during training rather than fixing them at initialization.
- **Joint diversity and sparsity:** Combine heterogeneous activations with kWTA competition within the same layer.
- **Broader architectures & efficiency:** Test these mechanisms in Vision Transformers and measure wall-clock latency using hardware-aware sparse operations.

---

# Project Information

Submitted to **SOICT 2026** (not accepted).

- **Authors:** Phuc-Nguyen Lam-Gia, Ngoc-Tuan Nguyen, Ha-Anh Nguyen-Ngoc, Hai-Dang Nguyen
- **Period:** May 2026 – Present (Ongoing)
- **Role:** Team Leader and First Author
- **Affiliations:** VNU-HCM High School for the Gifted; University of Science, VNU-HCM
- **Links:** [GitHub](https://github.com/rawsie-dev/brain-inspired-neural-networks) · [Manuscript](https://rawsie.dev/research/brain-inspired-nn.pdf)

