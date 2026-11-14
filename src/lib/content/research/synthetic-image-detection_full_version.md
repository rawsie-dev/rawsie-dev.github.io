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
hidden: true
summary: |
  MattaruNet explores a lightweight approach to detecting AI-generated images through contrastive distilled learning. Instead of relying on computationally expensive forensic architectures or handcrafted image filters, the project introduces embed pinpointing: a distillation process that uses the embedding space of a pretrained vision model to guide a compact student CNN.

  We experimented with EfficientNet-B0, B1, and B2 as teacher backbones, training a minimal two-convolution-layer student to distinguish real images from synthetic ones. Our best evaluation model, MattaruNetB1, achieved 75.70% accuracy and 77.61% F1, substantially outperforming our 51.30% baseline CNN.

  However, performance dropped considerably on the unseen test set, exposing limitations in representation learning, teacher-student alignment, and cross-distribution generalization. The project was presented through the MediaEval 2025 Workshop, and became an important exploration of lightweight computer vision, knowledge distillation, and the challenges of building practical synthetic-image detectors.
---

# Overview

The rapid development of generative AI has fundamentally changed how images are created and distributed. Modern generative models can produce increasingly realistic images, often making it difficult to distinguish synthetic content from genuine photographs through visual inspection alone.

As these models become more accessible, reliable synthetic-image detection becomes increasingly important. However, developing practical detectors introduces several challenges.

Many existing approaches rely on handcrafted forensic features, frequency-domain analysis, or complex neural architectures designed to identify subtle inconsistencies in generated images. Although these methods can achieve competitive results, they often introduce additional computational overhead, require extensive feature engineering, or struggle to generalize across different generative models and image distributions.

We wanted to explore a different direction:

**Could a very small convolutional neural network learn to distinguish real and synthetic images by borrowing knowledge from an existing, pretrained vision model?**

This question became the foundation of MattaruNet, our submission to the Synthetic Images Task at the MediaEval 2025 Workshop.

Our approach combines knowledge distillation and contrastive learning into a framework we call *embed pinpointing*. Rather than training a compact CNN entirely from scratch, we use a pretrained image-classification backbone as a reference for learning meaningful visual representations.

The central idea is to use an existing embedding space as an anchor. By guiding the student model toward representations associated with real-world images while encouraging separation from synthetic samples, we aim to reduce the search space required for learning useful detection features.

The resulting architecture is intentionally minimal: a pretrained EfficientNet teacher operating alongside a student network consisting of only two convolutional layers and a dense layer.

Our work was published through the MediaEval 2025 Workshop.

## Research Objectives

We focused on several questions throughout the project:

1. **Lightweight architecture:** How far can a compact CNN go when guided by a much larger pretrained model?
2. **Representation learning:** Can an existing real-image embedding space provide a useful reference for distinguishing synthetic content?
3. **Contrastive distillation:** Can combining distillation and contrastive objectives help a small network learn discriminative representations more efficiently?
4. **Teacher selection:** How does the choice of pretrained EfficientNet backbone affect student performance?
5. **Generalization:** Does performance on the provided evaluation dataset translate to previously unseen data?

These questions shaped both our architecture and our experimental evaluation.

# What I Built

My primary contributions to this research involved developing the data-processing and evaluation pipelines, conducting the majority of the experiments, and investigating the behavior of the proposed models.

The project involved several interconnected components, from preparing image data and configuring teacher-student training to comparing model variants and analyzing their generalization failures.

## 1. The Embed Pinpointing Approach

The main idea behind MattaruNet is what we call *embed pinpointing*.

Traditional supervised classification generally asks a model to learn a mapping directly from images to their corresponding classes. While this can work well, a small network may lack the capacity to discover sufficiently useful representations from a limited training distribution.

We approached this problem by introducing an existing representation space into the learning process.

A pretrained vision model has already learned meaningful visual structures from a large collection of real-world images. Its embeddings can therefore serve as a reference for the student model.

We use this property to guide the student toward a more constrained representation space.

The intuition is:

- Real images should retain meaningful similarities to the representations learned by the pretrained teacher.
- Synthetic images should be distinguishable from this real-image reference.
- Contrastive learning should encourage the student to develop representations that separate the two categories.
- A classification objective should ensure that the resulting embeddings remain useful for the actual detection task.

Rather than forcing the student to independently discover every relevant visual feature, we provide it with a reference point from which to learn.

This is the motivation behind embed pinpointing.

## 2. Teacher-Student Architecture

Our training architecture consists of two neural networks operating in parallel.

### Teacher: Pretrained EfficientNet

We experimented with three pretrained EfficientNet variants:

- EfficientNet-B0
- EfficientNet-B1
- EfficientNet-B2

Each backbone was pretrained on ImageNet.

The teacher provides an established representation of real-world visual content. Since it has been trained on a large image dataset, we hypothesized that its embeddings would encode useful semantic information that could help distinguish natural images from synthetic ones.

We investigated multiple EfficientNet scales to understand how the teacher's capacity influenced the resulting student.

Importantly, the objective was not to deploy the full teacher as our final detector. Its primary purpose was to provide representation guidance during training.

### Student: Minimal Convolutional Neural Network

The student is deliberately small.

Its architecture consists of:

- Two convolutional layers.
- A dense layer.
- A classification head for binary real-versus-synthetic prediction.

This minimal architecture was chosen to investigate how much useful detection capability could be transferred into a compact model.

Rather than relying on a large backbone or complicated feature aggregation mechanisms at inference, we wanted the student to learn representations that could support detection with substantially less architectural complexity.

The teacher and student interact during training through the distillation and contrastive objectives.

### Architecture at a Glance

The overall training pipeline can be represented as follows:

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

The teacher supplies the representation reference, while the student learns both the desired embedding behavior and the final classification task.

## 3. Contrastive Distillation

The most important part of the architecture is the interaction between the teacher and student through their learning objectives.

We employ two complementary objectives to guide representation learning.

### Distillation Loss

The distillation objective encourages the student to learn from the pretrained teacher's embeddings, particularly for real-image samples.

The motivation is to preserve meaningful representations of natural images rather than allowing the student to develop an entirely independent feature space.

This also helps reduce false-positive classifications, where genuine photographs are incorrectly identified as synthetic.

In essence, the teacher provides a reference for what real-image representations should look like.

### Contrastive Loss

Distillation alone does not necessarily teach the student how to distinguish synthetic content.

We therefore introduce a contrastive objective.

While the distillation component provides a reference representation for real images, the contrastive component encourages the student to learn embeddings that separate synthetic samples from that reference.

This constrains the student's learning process and encourages it to focus on features relevant to the distinction between real and synthetic content.

The intention is to make representation learning more efficient despite the student's limited capacity.

### Classification Loss

Although distillation and contrastive learning guide the embedding space, they do not independently guarantee that the learned representations are useful for binary classification.

We therefore attach a classification head to the student and train it using binary cross-entropy loss.

This provides a direct supervised signal for the actual detection objective.

### Combined Objective

The overall loss is a weighted combination of the contrastive distillation objective and the classification objective:

$$
\mathcal{L}
=
\alpha \mathcal{L}_{contrast}
+
(1-\alpha)\mathcal{L}_{classification}
$$

where:

$$
0 \leq \alpha \leq 1
$$

The hyperparameter $\alpha$ controls the relative contribution of representation learning and classification.

For MattaruB0, MattaruB1, and MattaruB2, we kept this weighting constant.

For MattaruB2V2, we experimented with a multiplicative scheduler that reduced the contrastive contribution after each epoch.

This allowed us to investigate how the balance between representation guidance and direct classification affected training behavior.

## 4. Data Augmentation

A major concern in synthetic-image detection is that models can learn superficial patterns that are specific to a particular dataset or generation pipeline.

For example, a detector might accidentally associate certain image characteristics with a particular class without learning meaningful features that generalize across different synthetic-image sources.

To mitigate this, we applied dynamic, runtime data augmentation during training.

Our augmentation pipeline included:

- Random horizontal flipping.
- Random rotation.
- Random zoom.
- Random translation.
- Random brightness adjustment.
- Random contrast adjustment.
- Random saturation adjustment.
- Gaussian noise.

These transformations were controlled through a shared scaling hyperparameter for simplicity.

The intention was to expose the student to a broader range of visual variations and discourage it from relying exclusively on trivial local patterns or dataset-specific noise.

# Technologies

The project primarily involved deep learning, computer vision, and experimental model evaluation.

| Technology | Purpose |
|---|---|
| Python | Research implementation and experimentation |
| PyTorch / deep learning framework | Neural network training and model experimentation |
| EfficientNet | Pretrained teacher backbones |
| Convolutional Neural Networks | Lightweight student architecture |
| ImageNet | Pretraining source for teacher models |
| Contrastive Learning | Representation separation |
| Knowledge Distillation | Teacher-guided student learning |
| Binary Cross-Entropy | Classification objective |
| Data Augmentation | Improving robustness during training |
| NumPy | Numerical processing and experiment analysis |

The main architectural components were implemented around a parallel teacher-student training setup, with separate representation-learning and classification objectives.

# Results

We evaluated the proposed architecture against a baseline consisting of a two-layer convolutional neural network without the proposed teacher-guided approach.

We experimented with three teacher configurations: EfficientNet-B0, EfficientNet-B1, and EfficientNet-B2.

The experiments produced an interesting result: the teacher-student approach substantially improved performance on the provided evaluation dataset, but this improvement did not translate consistently to the unseen test set.

## 1. Evaluation Dataset

The following results were obtained by evaluating models trained on the organizers' provided training set against their evaluation set.

| Model | Accuracy | Real Precision | Real Recall | Fake Precision | Fake Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|
| CNN-2 (Baseline) | 51.30% | 49.90% | 47.90% | 52.51% | 54.50% | 53.49% |
| MattaruNetB0 | 67.21% | 61.90% | 76.18% | 71.17% | 55.63% | 62.45% |
| MattaruNetB1 | **75.70%** | **77.23%** | 72.90% | 75.66% | 79.66% | **77.61%** |
| MattaruNetB2 | 74.36% | 72.88% | **75.37%** | **75.92%** | 73.46% | 74.67% |

MattaruNetB1 achieved the strongest overall performance.

Compared with the baseline CNN, it improved evaluation accuracy from 51.30% to 75.70%, an absolute improvement of 24.40 percentage points.

Its F1 score also increased from 53.49% to 77.61%.

These results demonstrated that the proposed teacher-guided learning approach could substantially improve the performance of a minimal student architecture on the provided evaluation distribution.

### Comparing the Teacher Backbones

The three EfficientNet variants exhibited different behaviors.

- **EfficientNet-B0:** Produced a reasonable improvement over the baseline, achieving 67.21% accuracy.
- **EfficientNet-B1:** Achieved the best overall evaluation performance, with 75.70% accuracy and 77.61% F1.
- **EfficientNet-B2:** Achieved 74.36% accuracy, slightly below B1.

Increasing the teacher's scale did not necessarily improve student performance.

This was an important observation: a larger pretrained backbone did not automatically produce a better lightweight detector.

## 2. Unseen Test Dataset

The evaluation results initially appeared promising. However, we also examined performance on the organizers' separate test dataset.

| Model | Accuracy | Real Precision | Real Recall | Fake Precision | Fake Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|
| MattaruNetB0 | **53.07%** | **52.51%** | 64.16% | **53.95%** | **41.98%** | **47.22%** |
| MattaruNetB1 | 49.73% | 49.80% | **66.02%** | 49.60% | 33.44% | 39.95% |
| MattaruNetB2 | 48.70% | 49.02% | 65.28% | 48.06% | 32.12% | 38.50% |

The results were considerably weaker than those obtained on the evaluation dataset.

Even more importantly, the model exhibited a noticeable bias toward classifying images as real.

The real-image recall remained relatively high, while fake-image recall dropped substantially.

For MattaruNetB1, for example, real-image recall reached 66.02%, whereas fake-image recall was only 33.44%.

This suggested that the student had not learned sufficiently robust representations for identifying synthetic images outside its training distribution.

Interestingly, MattaruNetB0 performed best on the unseen test set, despite having substantially lower evaluation accuracy than B1.

This highlighted the importance of considering generalization rather than selecting models solely by their validation or evaluation performance.

## 3. What the Results Tell Us

The experiments revealed an important distinction between learning to fit a particular dataset and learning representations that generalize.

The teacher-student architecture successfully improved performance over the baseline on the provided evaluation set.

However, the compact student appeared to rely on patterns that were not sufficiently transferable to the unseen distribution.

The results also suggested that scaling the teacher did not necessarily improve the quality of the resulting student representation.

In particular, the larger B1 and B2 configurations experienced more severe performance degradation on the unseen test set.

We hypothesized that differences in teacher-student resolution alignment as EfficientNet scaled could have contributed to this behavior.

The B0 configuration appeared to strike a relatively better balance between representation guidance and student capacity.

# Challenges and Failure Analysis

One of the most valuable parts of this project was understanding why an approach that initially produced promising results struggled to generalize.

Rather than treating the evaluation metrics as the final measure of success, we investigated several possible explanations for the performance degradation.

## 1. Limited Student Capacity

The student was intentionally minimal, consisting of only two convolutional layers and a dense layer.

Although this made the architecture attractive from a computational perspective, it also restricted the complexity of representations the model could learn.

We suspected that the limited capacity caused the student to rely on dataset-specific noise and superficial patterns rather than developing sufficiently generalizable representations.

This raised an important trade-off:

**A smaller architecture is not automatically a more efficient solution if its limited capacity prevents it from learning the features required by the task.**

Reducing model complexity must be balanced against the representational requirements of the problem.

## 2. Asymmetric Learning Signals

Another issue concerned how the teacher guided the student.

The student received meaningful reference embeddings for real images, but synthetic images did not receive an equivalent pretrained representation target.

Instead, their learning relied primarily on the contrastive objective and classification head.

We hypothesized that this asymmetry introduced a bias toward the real-image representation space.

The student had a comparatively clear direction for learning real-image representations, while its understanding of synthetic-image representations was less directly constrained.

This may have contributed to the relatively high real-image recall and poor synthetic-image recall observed on the unseen test dataset.

## 3. Loss Function Instability

Our contrastive and distillation formulation involved both cosine similarity and Euclidean distance.

Although the formulation included normalization, these two similarity measures behave differently and can introduce competing optimization signals.

We suspected that their interaction contributed to unstable representation learning.

Over time, this may have made it difficult for the student to maintain a consistent embedding structure, particularly when learning from an already constrained architecture.

This was one of the areas we identified as deserving further investigation.

## 4. Dataset Generalization

Ultimately, the most significant limitation was the difference between evaluation and unseen test performance.

The large gap suggested that the student had learned features that were useful within the provided evaluation distribution but insufficiently robust to changes in the underlying image distribution.

Synthetic-image detection is particularly challenging in this regard because different generative models, image-processing pipelines, and post-processing techniques can introduce very different visual characteristics.

A detector that recognizes patterns associated with one collection of synthetic images may not necessarily identify images produced through another process.

This reinforced the importance of evaluating synthetic-image detectors across genuinely different distributions rather than relying exclusively on in-distribution metrics.

# What I Learned

MattaruNet was an especially valuable research experience because it exposed me to the difference between designing an architecture that works in principle and developing one that performs reliably in practice.

Several lessons stood out.

## 1. Model Performance Is More Than a Single Metric

Initially, the 75.70% evaluation accuracy of MattaruNetB1 looked like a substantial improvement over our baseline.

However, the unseen test results told a very different story.

This taught me to approach model evaluation more critically.

Accuracy alone does not reveal whether a model has learned robust representations, whether it is biased toward a particular class, or whether it can generalize to unfamiliar data.

Examining precision, recall, F1 scores, and performance across different distributions is essential for understanding what a model actually learns.

## 2. Knowledge Distillation Is Not Simply Model Compression

I initially approached distillation as a way to transfer the capabilities of a larger model into a smaller one.

However, this project made me realize that the quality of the transferred knowledge matters just as much as the size of the student.

A teacher's representations are not automatically optimal for every downstream task.

The way those representations are selected, aligned, and incorporated into the student's learning objective can fundamentally influence the resulting model.

In our case, providing a real-image representation reference was a useful starting point, but it also introduced an asymmetry that we had not fully accounted for.

## 3. Simplicity Requires Careful Design

We deliberately chose an extremely small student architecture.

This made experimentation more accessible and allowed us to explore whether contrastive distillation could compensate for limited model capacity.

However, the experiments showed that architectural simplicity introduces its own constraints.

A model can be computationally lightweight while still being difficult to train, poorly generalized, or insufficiently expressive.

The goal should not simply be to minimize the number of layers, but to identify the smallest architecture that can reliably represent the information required by the task.

## 4. Negative Results Are Still Results

Perhaps the most important lesson was that an experiment does not become unsuccessful simply because its final metrics are disappointing.

Our generalization results exposed weaknesses in our original assumptions and gave us concrete directions for further research.

The project helped me become more comfortable with investigating failure rather than immediately trying to improve a headline metric.

Understanding why a model fails can be considerably more valuable than obtaining a marginal improvement without understanding the underlying behavior.

## 5. Research Is an Iterative Process

Working on MattaruNet also strengthened my experience with the practical side of machine learning research.

I worked extensively with data-processing pipelines, model experimentation, evaluation, and interpreting experimental results.

More importantly, I learned to treat research as an iterative process:

1. Identify a problem and formulate a hypothesis.
2. Design an architecture around that hypothesis.
3. Implement and run controlled experiments.
4. Analyze the results rather than relying on intuition.
5. Identify weaknesses and revise the original assumptions.

This process shaped how I approached subsequent research projects.

# Future Work

Although MattaruNet was published through MediaEval 2025, the experiments left several interesting directions for further investigation.

These are potential extensions rather than improvements that were already demonstrated by the original experiments.

## 1. Increasing Student Capacity

The most direct direction would be to investigate slightly larger student architectures.

Our original two-convolution-layer network was intentionally minimal, but its limited capacity may have prevented it from learning sufficiently expressive representations.

We could experiment with additional convolutional blocks, residual connections, or more carefully designed feature extraction modules.

The goal would be to find a better balance between computational efficiency and generalization.

## 2. Symmetric Representation Learning

One limitation of the original architecture was its asymmetric treatment of real and synthetic images.

A possible alternative would be to introduce separate representation-learning pathways for the two categories.

For example, two independent self-supervised vision models could learn real-image and synthetic-image representations separately.

Their embeddings could then be aligned through a shared objective.

This would provide more explicit representation guidance for both classes rather than relying primarily on real-image teacher embeddings.

However, such an approach would introduce additional complexity and could create optimization instability if the two networks learn at different rates.

## 3. Improving the Contrastive Objective

The original formulation combined cosine similarity and Euclidean distance.

A more carefully designed objective could investigate how these measures interact and whether their combination contributes to unstable training.

Potential directions include:

- More consistent embedding normalization.
- Alternative contrastive formulations.
- Improved weighting between representation learning and classification.
- More stable loss scheduling.
- Explicitly balanced learning objectives for real and synthetic samples.

These changes would need to be evaluated systematically to determine whether they improve generalization rather than simply increasing evaluation accuracy.

## 4. Better Teacher-Student Alignment

The difference in behavior between EfficientNet-B0, B1, and B2 suggested that teacher selection and representation alignment deserved further investigation.

One possibility would be to examine the relationship between teacher input resolution, embedding dimensionality, and the student's representational capacity.

A more controlled alignment mechanism could help prevent the student from learning features that are difficult to transfer effectively.

## 5. Stronger Cross-Distribution Evaluation

Finally, future experiments should place greater emphasis on generalization.

Rather than evaluating performance primarily on a single dataset split, we would like to investigate how the architecture performs across different synthetic-image generators, image resolutions, and post-processing pipelines.

This would provide a more realistic assessment of whether the learned representations capture general synthetic-image characteristics or merely exploit dataset-specific patterns.

Ultimately, a practical detector should remain useful even when the source of synthetic images changes.

# Conclusion

MattaruNet began with a relatively simple question: could a minimal convolutional network learn useful synthetic-image detection features by borrowing knowledge from a pretrained vision model?

Through embed pinpointing, contrastive distillation, and a teacher-student architecture, we demonstrated that a compact CNN could substantially outperform a comparable baseline on the provided evaluation dataset.

Our best configuration, MattaruNetB1, achieved 75.70% accuracy and 77.61% F1, compared with 51.30% baseline accuracy.

However, the substantial performance degradation on the unseen test dataset exposed important limitations in the approach.

The experiments highlighted challenges involving limited model capacity, asymmetric representation guidance, loss-function stability, and distribution generalization.

For me, the most valuable outcome was not simply the evaluation score. It was the opportunity to investigate an architectural hypothesis, implement the experiments, analyze unexpected results, and identify the assumptions that needed to be reconsidered.

MattaruNet reinforced an idea that has continued to influence how I approach machine learning research:

**A model that performs well on a benchmark is not necessarily a model that has learned the underlying problem. Understanding the difference is where much of the actual research begins.**

---

# Publication

This work was published in the **MediaEval 2025 Workshop** as part of the Synthetic Images Task.

**Paper:** [Mattaru Net: Lightweight synthetic images detection using contrastive distilled learning](https://2025.multimediaeval.com/paper31.pdf)

**Authors:** Ngoc-Tuan Nguyen, Phuc-Nguyen Lam-Gia, Nhat-Khai Hoang, Duc-Nghi Hoang, and Hai-Dang Nguyen.

**Affiliations:**
- VNU-HCM High School for the Gifted.
- University of Science, Vietnam National University Ho Chi Minh City.

The research was conducted as a collaborative effort, with my contributions focusing on data processing, evaluation pipelines, and experimental implementation.

*Published at MediaEval 2025.*
