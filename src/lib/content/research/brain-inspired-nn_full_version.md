---
title: "Exploring Brain-Inspired Functional Diversity and Competitive Sparsity in Artificial Neural Networks"
date: "2026-11-10"
description: "An investigation into biologically inspired neural network architectures, exploring neuronal functional diversity, heterogeneous activation functions, and competitive sparsity across tabular and image classification tasks."
status: "Ongoing"
authors:
  - "Rawsie"
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
featured: false
hidden: true
summary: |
  What if artificial neural networks benefited from some of the functional diversity found in biological brains?

  This research investigates three parameter-free, biologically motivated mechanisms: Multi-Activation Neurons (intra-neuron functional diversity), Neuronal Heterogeneity (inter-neuron functional diversity), and k-Winners-Take-All (kWTA) competitive sparsity.

  Over approximately six months, I led a research project evaluating these mechanisms across tabular datasets (Adult Income, Dry Bean) using an 8-layer multilayer perceptron and image benchmarks (DeepDetect-2025, Tiny ImageNet) using ConvNeXtV2-Base.

  Our experiments produced promising gains in specific vision configurations: chunked heterogeneity achieved 93.72% accuracy compared to 90.64% for the GELU baseline on DeepDetect-2025, and 75%-retention kWTA reached 50.61% compared to 49.81% on Tiny ImageNet. However, these parameter-free mechanisms introduced a 23–134% training runtime overhead and showed that efficacy depends heavily on task structure, modality, and sparsity ratios.

  This project served as an empirical reality check on how biological principles behave as practical inductive biases in modern neural network design.
---

# Exploring Brain-Inspired Functional Diversity and Competitive Sparsity in Artificial Neural Networks

## Overview

Artificial neural networks are loosely inspired by the biological nervous system. Despite this inspiration, many conventional architectures rely on relatively homogeneous computational units: neurons within a layer typically share the same activation function, follow similar computational rules, and participate in dense information processing.

Biological neurons, however, are considerably more diverse.

Different neurons exhibit different response characteristics, firing behaviors, connectivity patterns, and functional specializations. Furthermore, biological neural systems frequently exhibit sparse activity, where only a subset of neurons respond strongly to a particular stimulus.

This raises an interesting question:

**Could introducing functional diversity and competitive sparsity into artificial neural networks improve their learning behavior and performance?**

That question became the foundation of this research project.

Beginning in May 2026, I have spent approximately six months investigating biologically motivated neural network architectures as part of a research project at PTNK, working with the Science and Engineering Laboratory (SELab) under the mentorship of Hai-Dang Nguyen.

As the team leader and first author, I was responsible for driving the research direction, investigating architectural approaches, implementing experiments, evaluating results, and coordinating the development of our work.

Rather than attempting to build a complete computational model of the human brain (which was our first idea), we focused on translating two relatively specific biological observations into experimentally testable architectural modifications:

1. **Neuronal Functional Diversity:** Biological neurons do not all respond to stimuli in the same way. We investigated whether introducing heterogeneous activation functions could provide artificial networks with more diverse computational behaviors.
2. **Competitive Sparsity:** Biological neural systems often exhibit sparse activation patterns. We investigated whether restricting neuronal activity through competitive mechanisms could improve network behavior.

The resulting work explored three parameter-free architectural mechanisms: Multi-Activation Neurons, Neuronal Heterogeneity, and k-Winners-Take-All (kWTA).

We evaluated these approaches across different learning settings, from conventional tabular classification using multilayer perceptrons to image classification using ConvNeXtV2-Base.

The project eventually developed into a research manuscript titled *Exploring Brain-Inspired Functional Diversity and Competitive Sparsity in Artificial Neural Networks*, which we submitted to SOICT 2026.

---

## Research Motivation

### The limitations of homogeneous neural computation

A conventional neural network layer generally applies the same activation function to every neuron.

For example, given a layer with pre-activation values:

$$
z = Wx+b
$$

the output is computed as:

$$
a = \phi(z)
$$

where $\phi$ is an activation function such as ReLU, GELU, or SiLU.

Every neuron in that layer applies the same transformation.

This design is effective and has contributed to the success of modern deep learning. Nevertheless, it represents a relatively homogeneous approach to neuronal computation.

Biological neurons exhibit considerably more variation. Different neuronal populations can have different response curves and computational roles, potentially allowing a biological network to represent information through a diverse collection of response characteristics.

This motivated us to investigate whether assigning different activation functions to different artificial neurons could introduce useful computational diversity.

### Why neuronal diversity matters

Consider a layer containing neurons with different activation functions.

Functional diversity can be introduced either within a single neuron (intra-neuron diversity) by averaging a set of $K$ nonlinearities: 

$$
h_i = \frac{1}{K}\sum_{k=1}^{K} \alpha_k f_k(z_i)
$$ 

or across different neurons in a layer (inter-neuron diversity), where each neuron applies its own assigned activation function: 

$$
h_i = f_i(z_i)
$$ 

For example, under inter-neuron heterogeneity, different neurons in the same layer are assigned ReLU, GELU, SiLU, or Mish.

These functions exhibit different mathematical properties:

- ReLU introduces a piecewise-linear response with zero-valued outputs for negative inputs.
- GELU provides a smoother nonlinear transformation.
- Tanh produces bounded, symmetric outputs.
- Sigmoid produces bounded outputs between zero and one.
- Other nonlinearities introduce additional response characteristics.

Combining these functions within the same network could potentially allow different neurons to specialize in different computational patterns.

However, diversity alone does not guarantee better learning. Different activation functions can introduce differences in gradient behavior, numerical scale, saturation, and optimization stability.

Consequently, the question was not simply whether we could introduce heterogeneous neurons, but whether that heterogeneity would produce measurable benefits.

### Why competitive sparsity matters

A second motivation came from sparse neural activity.

In a conventional dense layer, most neurons may produce nonzero activations for a given input. While this provides considerable representational flexibility, it also means that many neurons participate in processing each sample.

Biological neural systems frequently exhibit sparse activity, where only a relatively small subset of neurons respond strongly to a particular stimulus.

We investigated whether artificial neural networks could benefit from a similar competitive mechanism.

Instead of allowing every neuron to activate independently, we could introduce competition between neurons and retain only the strongest responses.

This led us to investigate the k-Winners-Take-All mechanism.

---

## Research Questions

We organized the investigation around several questions:

1. Does assigning different activation functions to individual neurons improve representation diversity or predictive performance?
2. Does introducing randomized or structured neuronal heterogeneity produce different outcomes?
3. Can competitive sparsity improve network performance by restricting neuronal activity?
4. How sensitive are these mechanisms to architectural choices and sparsity levels?
5. Do findings from relatively simple multilayer perceptrons translate to more sophisticated convolutional architectures?
6. Are biologically motivated architectural modifications consistently beneficial, or are their effects dependent on the task and model?

These questions shaped our experimental design and helped us avoid treating biological inspiration as evidence of practical improvement.

---

# What I Built

The research focused on three principal architectural directions.

## 1. Multi-Activation Neurons

The central idea behind Multi-Activation Neurons is intra-neuron functional diversity: instead of applying a single nonlinearity, each individual neuron evaluates ten fixed nonlinear transformations on its pre-activation $z = w^\top x + b$ and averages their outputs: 

$$
f_{\text{MA}}(x) = \frac{1}{10}\left[0.25\,\text{ReLU}(x) + x\tanh(x) + \tanh(x) + \sigma(x) + \sin(x) + \frac{1}{x^2+1} + \text{Snake}(x) + \sigma(x)\cos(x) + \text{erf}(x) + x\sigma(x)\right]
$$

### Activation function diversity

We combined 10 fixed activation functions spanning five qualitative response types: unbounded nondecreasing ($\text{ReLU}$, scaled by 0.25 to prevent linear drift from dominating), saturating ($\tanh, \sigma, \text{erf}$), oscillatory ($\sin, \sigma(z)\cos(z)$), locally symmetric ($1/(z^2+1)$), and input-dependent modulation ($z\tanh(z), \text{Snake}(z), z\sigma(z)$).

Each activation function has different mathematical characteristics, which may influence:

- The range and distribution of neuron outputs.
- Gradient propagation during backpropagation.
- The degree of nonlinearity introduced by each neuron.
- The optimization behavior of the network.
- The types of patterns that individual neurons can represent.

A heterogeneous layer therefore has the potential to combine several different computational behaviors.

### Intra-neuron aggregation

An important distinction in this investigation was the granularity of heterogeneity.

Inspired by complex dendritic integration within biological cells, this mechanism aggregates diverse nonlinear responses inside every single neuron without adding learnable parameters. However, summing multiple nonlinearities within a single unit can also smooth out feature boundaries and induce feature cancellation during optimization.

The resulting architecture is more flexible than a conventional single-activation design, although it also introduces additional implementation and experimental considerations.

### What we wanted to investigate

Our primary objective was to determine whether activation diversity could provide a useful inductive bias.

We did not assume that more activation functions would automatically produce better representations.

In particular, heterogeneous activation functions can create differences in output scales and gradient distributions. These differences may help diversify computation, but they can also make optimization more difficult.

The experiments were therefore designed to evaluate the actual behavior of the resulting networks rather than relying on biological intuition alone.

---

## 2. Neuronal Heterogeneity

While Multi-Activation Neurons combine nonlinearities within each unit, Neuronal Heterogeneity distributes different activation functions across neurons in a layer (inter-neuron diversity). 

For pre-activations $z = Wx + b$, each neuron applies one fixed activation $h_i = f_i(z_i)$ selected from four functions: $$f_i \in \{\text{ReLU}, \text{GELU}, \text{SiLU}, \text{Mish}\}$$ This compact set pairs piecewise-linear computation ($\text{ReLU}$) with three smooth, input-dependent gating functions ($\text{GELU}, \text{SiLU}, \text{Mish}$).

We explored two approaches.

### Random Neuronal Heterogeneity

The first approach involved randomized assignment.

In Random Assignment, the four activations ($\text{ReLU}, \text{GELU}, \text{SiLU}, \text{Mish}$) are distributed as evenly as possible across the layer and randomly shuffled once at initialization, remaining fixed during training.

This provided a relatively straightforward way to investigate whether heterogeneous computation could improve network behavior without requiring a complicated architectural redesign.

Randomized heterogeneity also allowed us to explore a less structured distribution of computational characteristics.

However, randomness introduces an important experimental consideration: results may depend on the particular assignment of activation functions.

Consequently, comparisons involving randomized heterogeneity need to account for initialization and experimental variability.

### Chunked Neuronal Heterogeneity

The second approach involved structured, chunked assignment.

In Chunked Assignment, the layer's neurons are divided into four contiguous blocks at initialization, with each block assigned one of the four activation functions.

This provided a more structured form of functional diversity.

Conceptually, the layer could contain several groups of neurons, each using a different nonlinear transformation.

This introduced an interesting distinction:

- Random heterogeneity distributes functional diversity without an explicit grouping structure.
- Chunked heterogeneity introduces a more organized distribution of computational behaviors.

We wanted to investigate whether this structural organization affected the network's ability to learn useful representations.

Chunking also provided a more interpretable way to control how functional diversity was distributed throughout the layer.

### Why compare both approaches?

Random and chunked heterogeneity represent different assumptions about how diversity should be organized.

Random assignment explores diversity without imposing an explicit structure.

Chunked assignment explores whether organizing different computational behaviors into groups provides an advantage.

Neither approach is inherently superior.

Their effectiveness depends on the learning task, architecture, activation functions, and optimization behavior.

Comparing them allowed us to investigate not only whether heterogeneity mattered, but also whether its organization mattered.

---

## 3. k-Winners-Take-All (kWTA)

Our second major biological inspiration was competitive sparsity.

We investigated k-Winners-Take-All, commonly abbreviated as kWTA.

The mechanism introduces competition between neurons by retaining only the strongest $k$ activations.

Given a layer's activation vector:

$$
a = [a_1,a_2,\ldots,a_n]
$$

the kWTA mechanism identifies the strongest $k$ responses.

The resulting activation vector can be expressed as:

$$
a'_i =
\begin{cases}
a_i & \text{if } a_i \text{ is among the top } k\\
0 & \text{otherwise}
\end{cases}
$$

This produces a sparse representation in which only a subset of neurons remain active.

### Introducing competition

In a conventional layer, neurons independently produce their activations.

With kWTA, the output of a neuron also depends on the responses of other neurons in the same competitive group.

A neuron may produce a relatively strong activation, but if enough other neurons produce stronger responses, it will not remain active.

This introduces an explicit competition mechanism.

The result is a representation in which only the strongest responses are retained.

### Controlling sparsity

Placed directly after the $\text{GELU}$ activation ($a = \text{GELU}(z)$), the parameter $k\%$ specifies the percentage of top activations retained by value (without renormalization), while the remaining $100\% - k\%$ are set to zero. We evaluated three fixed retention levels: $k \in \{75\%, 50\%, 25\%\}$, which correspond to 25%, 50%, and 75% sparsity respectively. In ConvNeXtV2-Base, kWTA is inserted between $\text{GELU}$ and Global Response Normalization (GRN), competing across channels $C$ independently at each spatial location $(b, h, w)$.

We investigated different sparsity configurations to understand how restricting neuronal activity affected predictive performance.

### Why sparse representations?

There are several potential motivations for introducing sparse activation:

- Encouraging neurons to respond selectively to different input patterns.
- Reducing the number of active neurons for a particular sample.
- Introducing competition between neurons.
- Exploring more selective internal representations.
- Investigating whether restricting activation can act as a useful architectural regularization mechanism.

However, sparsity also comes with trade-offs.

Removing too many activations may discard useful information, while competition can make optimization more challenging.

The appropriate sparsity level is therefore an experimental question rather than a universal architectural constant.

### Implementation considerations

An important consideration when introducing kWTA is how the competitive operation interacts with gradient-based optimization.

Selecting the strongest activations is not an ordinary smooth transformation.

During backpropagation, gradients flow exclusively through the winning units and are zeroed out for suppressed units: $$\frac{\partial h_i}{\partial a_i} = \begin{cases} 1 & \text{if } i \in \text{top-}k\% \\ 0 & \text{otherwise} \end{cases}$$

This makes implementation details particularly important when comparing kWTA networks against conventional baselines.

Our experiments treated kWTA as an architectural modification whose practical value needed to be evaluated empirically.

---

# Experimental Methodology

## Experimental Strategy

One of the most important aspects of this project was evaluating our ideas across more than one type of neural network.

A mechanism that appears promising in a relatively simple multilayer perceptron may behave differently in a convolutional architecture.

Similarly, improvements on one dataset do not necessarily imply improvements on unrelated tasks.

To investigate this, we explored both tabular and image-based learning settings.

Our experimental setup included:

| Component | Approach |
|---|---|
| Conventional baseline | GELU |
| Functional diversity | Multi-Activation |
| Neuronal heterogeneity | Random assignment |
| Structured heterogeneity | Chunked assignment |
| Competitive sparsity | kWTA |
| Tabular architecture | Multilayer Perceptron (MLP) |
| Image architecture | ConvNeXtV2-Base |

The GELU-based configuration served as a conventional reference point for evaluating the architectural modifications.

We were particularly interested in whether the proposed mechanisms could provide benefits beyond simply changing the underlying activation function.

## 1. Tabular Learning: Multilayer Perceptrons

We first investigated the architectural modifications using multilayer perceptrons.

MLPs provide a relatively controlled environment for studying neuronal behavior because their computation is comparatively straightforward.

Unlike convolutional networks, they do not introduce spatial kernels or hierarchical feature extraction as additional variables.

This made them useful for examining the effects of activation heterogeneity and competitive sparsity.

We used MLP-based experiments to investigate:

- The effects of different activation functions.
- The behavior of heterogeneous activation assignments.
- Differences between randomized and chunked heterogeneity.
- The effects of restricting neuronal activity through kWTA.
- The relationship between sparsity levels and predictive performance.

The MLP experiments served as an important foundation for understanding how these mechanisms behaved under relatively simple architectural conditions.

## 2. Image Classification: ConvNeXtV2-Base

We also explored the proposed ideas in a considerably more sophisticated setting using ConvNeXtV2-Base.

Unlike an MLP, ConvNeXtV2 is a modern convolutional architecture designed for visual representation learning.

It provides a more challenging environment for evaluating architectural modifications.

The transition from MLPs to ConvNeXtV2 allowed us to investigate whether the mechanisms we explored could also be applied in a convolutional setting.

This was particularly interesting because convolutional networks contain architectural components and feature-processing patterns that differ substantially from fully connected networks.

The goal was not to assume that an approach successful in an MLP would automatically generalize.

Instead, we wanted to examine how the architectural ideas behaved in a different model family.

The image experiments also helped broaden the scope of the research beyond relatively simple tabular prediction.

---

# Results

The experiments produced several promising findings, although the results also demonstrated that biologically inspired modifications do not consistently outperform conventional architectures.

Below are some of the results from our experiments.

## 1. DeepDetect: Chunked Neuronal Heterogeneity

One of the more encouraging results came from our DeepDetect experiment.

The chunked heterogeneity configuration achieved a reported score of:

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

This represents an absolute improvement of 3.08 points over the baseline.

The result was particularly interesting because it suggested that introducing structured functional diversity could be beneficial in at least one experimental setting.

Rather than distributing activation functions without an explicit structure, chunked heterogeneity organized different computational behaviors into groups.

This raised the possibility that the organization of neuronal diversity could be just as important as the diversity itself.

However, this result should be interpreted within the context of its specific experimental setup. It does not establish that chunked heterogeneity will outperform GELU across other datasets or architectures.

## 2. Tiny: Competitive Sparsity with kWTA

Another notable result came from our Tiny experiment.

We investigated a kWTA configuration with 75% sparsity, retaining approximately 25% of the relevant neuronal activations.

The configuration achieved a reported score of:

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

The absolute improvement was 0.80 points.

Although smaller than the improvement observed in the DeepDetect experiment, this result was interesting because the network retained only a fraction of its neuronal activations.

It provided an encouraging indication that competitive sparsity could be compatible with effective learning in this particular setting.

It also reinforced the importance of investigating sparsity as a controllable architectural parameter rather than assuming that dense activation is always preferable.

Importantly, this result does not by itself demonstrate lower inference latency or reduced hardware energy consumption. Achieving computational savings would require additional measurements of actual execution time and resource utilization.

## 3. Interpreting the Results

The results highlighted two interesting possibilities:

**First, structured functional diversity may be useful.**

The DeepDetect experiment suggested that organizing neurons into groups with different activation functions could provide an advantage over a homogeneous GELU configuration.

**Second, competitive sparsity does not necessarily prevent effective learning.**

The Tiny experiment demonstrated that a network using 75% sparsity could achieve a higher reported score than its conventional baseline.

Nevertheless, these results represent specific experimental observations rather than universal conclusions.

There are several important considerations when interpreting them:

- Different datasets may respond differently to activation heterogeneity.
- The effectiveness of chunked assignment may depend on the number and organization of chunks.
- kWTA performance may vary significantly with the selected sparsity level.
- Different model architectures may interact differently with the proposed mechanisms.
- Random initialization and experimental variability may influence measured performance.
- Predictive performance alone does not establish improved biological fidelity, interpretability, or computational efficiency.

For these reasons, we viewed the findings as promising directions for further investigation rather than definitive evidence that brain-inspired architectures are generally superior.

---

# Technologies

The project involved a combination of deep learning, experimental implementation, and research-oriented development.

The main architectural and methodological components included:

| Technology / Concept | Role |
|---|---|
| Python | Primary experimental implementation |
| PyTorch | Neural network development and experimentation |
| Multilayer Perceptrons | Tabular learning experiments |
| ConvNeXtV2-Base | Image classification experiments |
| GELU | Conventional activation baseline |
| Multi-Activation | Neuron-level activation diversity |
| Neuronal Heterogeneity | Randomized and chunked activation assignment |
| k-Winners-Take-All | Competitive sparsity |
| Backpropagation | Model optimization |
| Git / GitHub | Experiment and code management |

The project also involved experimental comparison, architectural analysis, and the interpretation of model performance across different configurations.

---

# What I Learned

This project was one of my most substantial experiences with research-oriented machine learning.

Beyond implementing neural network architectures, it changed how I approached experimentation, scientific uncertainty, and problem-solving.

## 1. Biological Inspiration Is Not the Same as Biological Equivalence

One of the most important lessons was understanding the difference between taking inspiration from biology and accurately modeling biological systems.

It is tempting to assume that because a mechanism resembles something observed in the brain, it should naturally improve an artificial neural network.

However, biological systems operate under considerably different constraints and mechanisms.

An artificial neuron with a different activation function is not necessarily equivalent to a biological neuron with a different firing characteristic.

Likewise, top-k activation selection is only an abstraction of the much more complicated competitive interactions found in biological neural systems.

The purpose of our work was not to claim that we had recreated biological neuronal diversity.

Instead, we investigated whether selected computational principles inspired by neuroscience could be translated into useful architectural ideas.

This distinction helped me become more careful about the claims I made and the conclusions I drew from experimental results.

## 2. More Complexity Does Not Necessarily Mean Better Performance

Another important lesson was that architectural complexity is not inherently beneficial.

Adding more activation functions, introducing competition, or modifying the internal structure of a network can make an architecture more expressive.

However, additional flexibility also introduces additional variables that influence optimization.

A more complicated architecture may:

- Require more careful hyperparameter selection.
- Introduce optimization instability.
- Produce inconsistent improvements across datasets.
- Make experimental comparisons more difficult.
- Increase implementation complexity without providing meaningful benefits.

The most interesting question is therefore not how many mechanisms we can introduce, but whether each modification provides a measurable advantage.

## 3. Experimental Design Matters as Much as Implementation

Research is not simply about building something and observing whether it works.

A meaningful comparison requires a reasonable baseline, controlled experimental conditions, and careful interpretation.

For this project, GELU served as an important reference point.

We also learned the importance of evaluating mechanisms across different settings rather than relying on one favorable experiment.

In particular, comparing MLP-based experiments with ConvNeXtV2-based experiments helped us think more carefully about architectural generalization.

A result that looks promising in one environment is only the beginning of a research investigation.

## 4. Negative and Inconclusive Results Are Still Useful

Not every architectural modification produces an improvement.

Some configurations may perform similarly to the baseline, while others may introduce trade-offs that outweigh their potential benefits.

This is an important part of experimentation.

A research project should not be judged solely by how many configurations outperform a baseline.

Understanding why a particular approach does not work can be just as valuable as identifying one that does.

This project encouraged me to look beyond individual performance numbers and consider the broader behavior of the architectures.

## 5. Research Requires Iteration and Collaboration

Working as the team leader and first author also changed how I approached collaborative research.

I became more proactive about identifying problems, discussing possible solutions with my mentor, and asking for feedback when an experimental direction was unclear.

I learned that research rarely follows a perfectly linear process.

An initial hypothesis may need to be revised. An implementation may behave differently from what was expected. A promising result may require additional validation before it can support a meaningful conclusion.

Being able to recognize these situations, communicate them, and adapt accordingly became an important part of my development as a researcher.

## 6. Bridging Theoretical Ideas and Practical Engineering

Perhaps the most rewarding part of the project was translating relatively abstract ideas from neuroscience into concrete computational mechanisms.

Concepts such as neuronal diversity and competitive sparsity are broad biological observations.

Turning them into activation assignments, selection operations, architectural configurations, and measurable experiments requires a different kind of thinking.

It involves balancing theoretical motivation with implementation constraints.

This experience strengthened my interest in machine learning research, particularly work that connects ideas from different fields to practical computational systems.

---

# Research Dissemination

The project developed into a research manuscript titled:

*Exploring Brain-Inspired Functional Diversity and Competitive Sparsity in Artificial Neural Networks.*

We submitted the manuscript to the 2026 Symposium on Information and Communication Technology (SOICT 2026).

The submission was not accepted.

Although this was not the outcome we had hoped for, the experience was still valuable.

Preparing a manuscript required us to organize our hypotheses, explain our architectural decisions, describe our experimental methodology, and communicate the limitations of our findings.

It also exposed me to the difference between implementing a promising idea and presenting a sufficiently rigorous scientific contribution.

A working implementation is only one part of research. A convincing contribution also requires clear motivation, appropriate experimental validation, reproducibility, and a careful discussion of what the results actually establish.

The submission process gave me a better understanding of those expectations and helped identify areas where the work could be strengthened.

---

# Future Work

There are several directions I would like to investigate if I continue developing this research.

## 1. More Comprehensive Activation Function Analysis

One potential direction is to investigate the individual contributions of different activation functions.

Although heterogeneous activation functions introduce functional diversity, it is important to understand which combinations are actually useful.

Future experiments could investigate:

- The effect of individual activation functions.
- Different proportions of each activation function.
- Randomized versus structured assignment.
- Activation reassignment during training.
- The relationship between activation diversity and gradient behavior.
- Whether particular activation combinations consistently perform better.

This could help distinguish the benefits of functional diversity from the effects of simply introducing additional nonlinearities.

## 2. Adaptive Neuronal Heterogeneity

Our investigation primarily explored predefined forms of heterogeneity.

A potentially interesting extension would be allowing the network to adapt its neuronal characteristics during training.

For example, an adaptive mechanism could investigate whether different neurons benefit from different activation functions based on their learned representations or optimization behavior.

This would introduce a more dynamic form of functional diversity.

However, such a mechanism would need to be carefully designed to avoid introducing unnecessary optimization complexity.

## 3. More Extensive kWTA Experiments

The kWTA experiments could be expanded to investigate a broader range of sparsity levels.

Rather than focusing on a small number of fixed configurations, future work could systematically compare different values of:

$$
k \in \{k_1,k_2,\ldots,k_m\}
$$

This would provide a clearer picture of how sparsity affects predictive performance.

Other interesting directions include:

- Adaptive sparsity based on input characteristics.
- Different competitive groups within a layer.
- Comparing kWTA with other sparse activation mechanisms.
- Investigating the effect of sparsity at different network depths.
- Studying the relationship between sparsity and generalization.

An especially interesting question is whether different layers benefit from different sparsity levels.

## 4. Combining Functional Diversity and Competitive Sparsity

The two central ideas of this project were investigated as distinct architectural mechanisms.

A natural next step would be to investigate their interaction.

For example, a layer could contain heterogeneous activation functions while also applying kWTA to determine which neurons remain active.

This would combine two different forms of diversity:

- Different neurons exhibit different computational responses.
- Only a subset of neurons remain active for a given input.

The combination could potentially create more selective and diverse representations.

However, it could also introduce additional optimization challenges.

A careful ablation study would be necessary to determine whether combining the mechanisms provides benefits beyond either modification individually.

## 5. Stronger Experimental Validation

Another important direction is improving the statistical reliability of the experimental results.

Future experiments could include:

- Multiple random seeds.
- Mean and standard deviation reporting.
- Confidence intervals where appropriate.
- More systematic hyperparameter searches.
- Consistent training and evaluation protocols.
- More comprehensive ablation studies.
- Comparisons against additional established baselines.

This would help distinguish consistent architectural improvements from results caused by experimental variability.

## 6. Computational Efficiency

Sparse activation introduces an interesting possibility: reducing the amount of computation performed by a network.

However, sparse activations do not automatically translate into faster inference.

A top-k selection operation itself introduces computational overhead, and ordinary dense matrix operations may not benefit from zero-valued activations without suitable sparse computation kernels.

Future work could investigate:

- Actual inference latency.
- GPU memory consumption.
- FLOPs and effective computational cost.
- Sparse tensor representations.
- Hardware-aware sparse execution.
- Training-time versus inference-time overhead.

This would help determine whether competitive sparsity offers practical engineering benefits beyond predictive performance.

## 7. Broader Architectural Evaluation

Finally, I would like to investigate whether these ideas generalize beyond the architectures used in this project.

Potential directions include:

- Transformer-based architectures.
- Vision Transformers.
- Larger convolutional networks.
- Different MLP configurations.
- Additional tabular and image datasets.

In particular, investigating heterogeneous computation within transformer components could provide an interesting extension of the original research.

The goal would be to understand whether the principles explored here represent generally useful architectural ideas or whether their benefits are specific to certain model families.

---

# Conclusion

This project began with a relatively simple question: could some of the computational diversity observed in biological neural systems inspire useful modifications to artificial neural networks?

Over approximately four months, we explored this question through Multi-Activation Networks, Neuronal Heterogeneity, and k-Winners-Take-All mechanisms.

We implemented and evaluated these ideas across multilayer perceptrons and ConvNeXtV2-Base, comparing different configurations against a conventional GELU baseline.

Some experiments produced encouraging improvements, including the DeepDetect chunked heterogeneity result and the Tiny kWTA configuration with 75% sparsity.

More importantly, the experiments demonstrated that the effectiveness of these mechanisms depends on how they are implemented and the conditions under which they are evaluated.

I came away from this project with a much better understanding of what it means to conduct machine learning research: developing a hypothesis, translating it into an implementation, designing experiments, interpreting unexpected results, and communicating conclusions without overstating the evidence.

The most valuable outcome was not simply achieving a higher performance score.

It was learning how to approach an open-ended technical question systematically, explore ideas that are not immediately obvious, and turn those ideas into something that can be tested.

**This research strengthened my interest in the intersection of neuroscience, machine learning, and neural network architecture design. It also gave me a foundation for approaching future research with a more critical and experimental mindset.**

---

## Project Information

- **Project:** Exploring Brain-Inspired Functional Diversity and Competitive Sparsity in Artificial Neural Networks
- **Research period:** May 2026 - current (ongoing)
- **Role:** Team Leader and First Author
- **Research affiliation:** PTNK / Science and Engineering Laboratory (SELab)
- **Mentor:** Hai-Dang Nguyen
- **Submission:** SOICT 2026 (not accepted)
- **Repository:** [GitHub](https://github.com/rawsie-dev/brain-inspired-neural-networks)
- **Manuscript:** [Paper](https://rawsie.dev/research/brain-inspired-nn.pdf)

*This article describes the research project and its experimental findings. Reported numerical results refer to specific experimental configurations and should not be interpreted as universal performance guarantees.*