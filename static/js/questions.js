const MCAT_QUESTIONS = {
    physics: [
        {
            id: 'p1',
            question: "A converging lens with a focal length of 15 cm is used to project an image of an object onto a screen. If the object is placed 30 cm in front of the lens, what is the image distance and what are the characteristics of the image?",
            options: [
                "15 cm, real and inverted",
                "30 cm, real and inverted",
                "30 cm, virtual and upright",
                "60 cm, real and magnified"
            ],
            correctIndex: 1,
            explanation: {
                correct: "Using the thin lens equation: 1/f = 1/do + 1/di. Submitting the values: 1/15 = 1/30 + 1/di. Simplifying: 1/di = 1/15 - 1/30 = 2/30 - 1/30 = 1/30. Thus, di = 30 cm. Since di is positive, the image is real. For a real image formed by a single lens, the image is always inverted. In this case, since do = 2f, the image is formed at 2f, resulting in a magnification of m = -di/do = -30/30 = -1 (same size, inverted).",
                incorrect: [
                    "15 cm is the focal length, which would only occur if the object were at infinity.",
                    "A virtual and upright image would be formed if the object were placed within the focal length (do < 15 cm). Here do (30 cm) is greater than f (15 cm).",
                    "60 cm would be the image distance if the object was placed closer (e.g., at 20 cm)."
                ]
            }
        },
        {
            id: 'p2',
            question: "A cardiologist is investigating blood flow through a stenosed (narrowed) artery. According to the Venturi effect and Bernoulli's principle, how do the fluid velocity and pressure change as blood moves from a wide section of the artery to a narrowed section?",
            options: [
                "Velocity increases, pressure increases",
                "Velocity decreases, pressure decreases",
                "Velocity increases, pressure decreases",
                "Velocity decreases, pressure increases"
            ],
            correctIndex: 2,
            explanation: {
                correct: "According to the continuity equation (A1*v1 = A2*v2), as cross-sectional area (A) decreases, velocity (v) must increase. Bernoulli's equation states that for an incompressible, non-viscous fluid, an increase in fluid speed occurs simultaneously with a decrease in pressure (P + 0.5*ρ*v^2 + ρ*g*h = constant). Therefore, in the narrow segment, velocity increases and static pressure decreases. This is known as the Venturi effect.",
                incorrect: [
                    "Pressure decreases rather than increases. An increase in kinetic energy (velocity) must be accompanied by a decrease in potential energy/static pressure.",
                    "Velocity increases due to the continuity equation, not decreases.",
                    "This option reverses the actual physical changes."
                ]
            }
        },
        {
            id: 'p3',
            question: "A researcher uses ultrasound to measure blood flow velocity. The ultrasound transducer emits a frequency of 5.0 MHz. As blood cells move away from the transducer, the reflected frequency is measured. What will the Doppler shift be, and what is its cause?",
            options: [
                "Positive shift; wave crests are compressed because the source is moving closer.",
                "Negative shift; wave crests are compressed because the source is moving away.",
                "Positive shift; wave crests are spaced further apart because the source is moving closer.",
                "Negative shift; wave crests are spaced further apart because the source is moving away."
            ],
            correctIndex: 3,
            explanation: {
                correct: "The Doppler effect describes the change in frequency of a wave relative to an observer who is moving relative to the wave source. When a reflector (blood cells) moves away from the source/observer (transducer), the wave crests are spaced further apart, resulting in an increased apparent wavelength and a decreased apparent frequency. This frequency decrease is a negative Doppler shift.",
                incorrect: [
                    "A positive shift occurs when the source and observer are moving closer to each other.",
                    "Wave crests are stretched (spaced further apart) when moving away, not compressed.",
                    "A positive shift corresponds to compressed crests (closer together), not further apart."
                ]
            }
        },
        {
            id: 'p4',
            question: "A crown suspected of being plated with gold is weighed. In air, its mass is 9.65 kg. When completely submerged in water, its apparent mass is measured as 9.15 kg. Given that the density of water is 1000 kg/m³, what is the density of the crown?",
            options: [
                "9300 kg/m³",
                "19300 kg/m³",
                "10600 kg/m³",
                "13600 kg/m³"
            ],
            correctIndex: 1,
            explanation: {
                correct: "According to Archimedes' principle, the buoyant force (Fb) equals the weight of the displaced fluid. Fb = W_air - W_water. Using mass equivalents: m_displaced = m_air - m_water = 9.65 kg - 9.15 kg = 0.50 kg. The volume of the displaced water (V) is V = mass/density = 0.50 kg / 1000 kg/m³ = 5.0 * 10^-4 m³. The volume of the crown is equal to the volume of the displaced water. The density of the crown is ρ = mass_air / Volume = 9.65 kg / (5.0 * 10^-4 m³) = 19,300 kg/m³. (Note: This is the actual density of pure gold!).",
                incorrect: [
                    "9300 kg/m³ would be the density if the displaced mass of water was larger, indicating a larger volume and lower density.",
                    "10600 kg/m³ is close to the density of silver (10.5 g/cm³), which would displace more water.",
                    "13600 kg/m³ is the density of liquid mercury at room temperature."
                ]
            }
        }
    ],
    biochemistry: [
        {
            id: 'bc1',
            question: "An investigator studies a novel competitive inhibitor for the enzyme lactate dehydrogenase. How will the addition of this competitive inhibitor affect the measured Michaelis constant (Km) and maximum velocity (Vmax) of the reaction?",
            options: [
                "Km increases, Vmax remains unchanged",
                "Km decreases, Vmax decreases",
                "Km remains unchanged, Vmax decreases",
                "Km increases, Vmax decreases"
            ],
            correctIndex: 0,
            explanation: {
                correct: "A competitive inhibitor binds reversibly to the active site of the enzyme, competing directly with the substrate. Because it increases the concentration of substrate needed to reach half of Vmax, the apparent Km increases. However, at extremely high substrate concentrations, the substrate outcompetes the inhibitor, allowing the enzyme to still reach its maximum reaction velocity (Vmax remains unchanged).",
                incorrect: [
                    "Competitive inhibitors do not decrease Vmax; noncompetitive or uncompetitive inhibitors do.",
                    "Km remaining unchanged with decreased Vmax describes noncompetitive inhibition.",
                    "Km increasing and Vmax decreasing describes mixed inhibition."
                ]
            }
        },
        {
            id: 'bc2',
            question: "Under physiological conditions (pH = 7.4), what will be the net charge of the tripeptide Aspartate-Lysine-Glutamate (Asp-Lys-Glu)?",
            options: [
                "+1",
                "0",
                "-1",
                "-2"
            ],
            correctIndex: 2,
            explanation: {
                correct: "Let's analyze the charges of the groups at pH = 7.4:\n1. N-terminus (amino group): +1 charge\n2. C-terminus (carboxyl group): -1 charge\n3. Aspartate side chain (carboxylate): pKa ≈ 3.9, so at pH 7.4, it is deprotonated and has a -1 charge.\n4. Lysine side chain (ammonium): pKa ≈ 10.5, so at pH 7.4, it is protonated and has a +1 charge.\n5. Glutamate side chain (carboxylate): pKa ≈ 4.1, so at pH 7.4, it is deprotonated and has a -1 charge.\nNet charge = (+1) + (-1) + (-1) + (+1) + (-1) = -1.",
                incorrect: [
                    "+1 is incorrect because the two acidic side chains (Asp, Glu) outweigh the basic side chain (Lys) and terminal amino group.",
                    "0 is incorrect; the tripeptide has a net negative charge.",
                    "-2 would occur if the terminal amino group were deprotonated, but its pKa is around 9, meaning it remains protonated (+1) at pH 7.4."
                ]
            }
        },
        {
            id: 'bc3',
            question: "Hemoglobin exhibits cooperative oxygen binding. Which of the following conditions stabilizes the T-state (tense, low-affinity state) of hemoglobin, causing a right-shift in the oxygen-binding curve?",
            options: [
                "Decreased temperature and increased pH",
                "Decreased partial pressure of CO2 and decreased 2,3-BPG",
                "Increased partial pressure of CO2 and decreased pH",
                "Carbon monoxide (CO) inhalation"
            ],
            correctIndex: 2,
            explanation: {
                correct: "A right-shift of the hemoglobin oxygen dissociation curve (favoring the T-state and promoting O2 unloading in tissues) is caused by: 1. Increased CO2 (carbaminohemoglobin formation). 2. Decreased pH (Bohr effect: H+ ions protonate histidine residues, stabilizing the T-state ionic connections). 3. Increased temperature. 4. Increased 2,3-BPG. Remember the mnemonic 'CADET, face Right!' for CO2, Acid, 2,3-BPG, Exercise, and Temperature.",
                incorrect: [
                    "Decreased temperature and increased pH shift the curve left, stabilizing the high-affinity R-state.",
                    "Decreased CO2 and decreased 2,3-BPG shift the curve left, increasing O2 affinity.",
                    "Carbon monoxide binds cooperatively to hemoglobin, stabilizing the R-state (high affinity for existing O2) and shifting the curve left."
                ]
            }
        },
        {
            id: 'bc4',
            question: "A molecular biologist wants to design PCR primers to amplify a specific gene. Which of the following parameters is most important to optimize to ensure high specificity and prevent primer-dimer formation during the annealing step?",
            options: [
                "Increasing the overall length to greater than 40 nucleotides.",
                "Ensuring a high concentration of adenine and thymine bases.",
                "Matching the melting temperatures (Tm) of both primers within 1-2 degrees C and maintaining 40-60% GC content.",
                "Lowering the annealing temperature to at least 15 degrees C below the calculated Tm."
            ],
            correctIndex: 2,
            explanation: {
                correct: "Ideal PCR primers: 1. Are 18-30 nucleotides long. 2. Have a GC content of 40-60% to ensure stable binding (due to 3 hydrogen bonds in G-C pairs vs 2 in A-T pairs). 3. Have matching melting temperatures (Tm) to ensure both anneal simultaneously. 4. Avoid self-complementary regions to prevent primer-dimer formation.",
                incorrect: [
                    "Primers longer than 40 nucleotides increase the risk of secondary structures and non-specific binding.",
                    "A high AT concentration lowers the Tm and decreases binding stability.",
                    "Lowering the annealing temperature too far below Tm leads to non-specific hybridization and amplification of unintended genomic products."
                ]
            }
        }
    ],
    chemistry: [
        {
            id: 'c1',
            question: "A buffer solution is prepared using a weak acid HA (pKa = 4.75) and its conjugate base A-. If the ratio of [A-] to [HA] is 10:1, what is the pH of the resulting buffer solution?",
            options: [
                "3.75",
                "4.75",
                "5.75",
                "6.75"
            ],
            correctIndex: 2,
            explanation: {
                correct: "According to the Henderson-Hasselbalch equation: pH = pKa + log([A-]/[HA]). Given pKa = 4.75 and [A-]/[HA] = 10, we have: pH = 4.75 + log(10) = 4.75 + 1 = 5.75.",
                incorrect: [
                    "3.75 would be the pH if the ratio [A-]/[HA] was 1:10 (log(0.1) = -1).",
                    "4.75 is the pH when [A-] = [HA] (log(1) = 0).",
                    "6.75 would be the pH if the ratio was 100:1 (log(100) = 2)."
                ]
            }
        },
        {
            id: 'c2',
            question: "A chemical reaction has an enthalpy change (ΔH) of -150 kJ/mol and an entropy change (ΔS) of -500 J/(mol*K). At which temperature range is this reaction spontaneous?",
            options: [
                "Spontaneous at all temperatures",
                "Spontaneous only above 300 K",
                "Spontaneous only below 300 K",
                "Non-spontaneous at all temperatures"
            ],
            correctIndex: 2,
            explanation: {
                correct: "Spontaneity is determined by Gibbs Free Energy: dG = dH - T*dS. For spontaneity, dG < 0. Here, dH is negative (-150,000 J/mol) and dS is negative (-500 J/mol*K). Set dG < 0: -150,000 - T(-500) < 0 => -150,000 + 500T < 0 => 500T < 150,000 => T < 300 K. Thus, the reaction is spontaneous only at temperatures below 300 K.",
                incorrect: [
                    "A reaction is spontaneous at all temperatures only if dH is negative and dS is positive.",
                    "Spontaneous above 300 K would be true if dH was positive and dS was positive.",
                    "Since it is spontaneous below 300 K, it is not non-spontaneous at all temperatures (which occurs when dH is positive and dS is negative)."
                ]
            }
        },
        {
            id: 'c3',
            question: "The solubility product constant (Ksp) of calcium fluoride (CaF2) is 3.2 * 10^-11. What is the molar solubility of calcium fluoride in a 0.10 M solution of sodium fluoride (NaF)?",
            options: [
                "3.2 * 10^-9 M",
                "2.0 * 10^-4 M",
                "3.2 * 10^-10 M",
                "1.6 * 10^-5 M"
            ],
            correctIndex: 0,
            explanation: {
                correct: "This is a common-ion effect problem. CaF2 dissociates as: CaF2(s) <=> Ca^2+(aq) + 2F^-(aq). The Ksp expression is Ksp = [Ca^2+][F^-]^2. In the presence of 0.10 M NaF, the concentration of fluoride is [F^-] = 0.10 M + 2x ≈ 0.10 M (since Ksp is very small, x is negligible). Let [Ca^2+] = x (molar solubility of CaF2). Submitting into the Ksp expression: 3.2 * 10^-11 = x * (0.10)^2 => 3.2 * 10^-11 = 0.01x => x = 3.2 * 10^-9 M.",
                incorrect: [
                    "2.0 * 10^-4 M is the molar solubility of CaF2 in pure water (Ksp = 4x^3 => x = (Ksp/4)^(1/3)).",
                    "3.2 * 10^-10 M is off by a factor of 10 due to squaring error.",
                    "1.6 * 10^-5 M is incorrect and does not reflect the common ion effect formula."
                ]
            }
        },
        {
            id: 'c4',
            question: "An electrolytic cell contains an aqueous solution of copper(II) sulfate (CuSO4). If a current of 5.0 A is passed through the cell for 965 seconds, how many moles of solid copper metal (Cu) will deposit on the cathode?",
            options: [
                "0.025 moles",
                "0.050 moles",
                "0.100 moles",
                "0.075 moles"
            ],
            correctIndex: 0,
            explanation: {
                correct: "Using Faraday's Law of Electrolysis: Charge (Q) = Current (I) * time (t). Q = 5.0 A * 965 s = 4825 Coulombs. Moles of electrons (n_e) = Q / F, where F (Faraday's constant) ≈ 96,500 C/mol e^-. n_e = 4825 C / 96,500 C/mol = 0.050 moles of electrons. Since copper in CuSO4 is Cu^2+, depositing 1 mole of Cu requires 2 moles of electrons (Cu^2+ + 2e^- -> Cu). Moles of Cu deposited = moles of electrons / 2 = 0.050 / 2 = 0.025 moles.",
                incorrect: [
                    "0.050 moles would be the yield if copper were in the +1 oxidation state (Cu+).",
                    "0.100 moles is four times the correct value.",
                    "0.075 moles is incorrect."
                ]
            }
        }
    ],
    organic_chemistry: [
        {
            id: 'oc1',
            question: "An organic chemist is analyzing an unknown compound. The infrared (IR) spectrum reveals a strong, broad absorption band centered at 3300 cm^-1 and a sharp, strong absorption band at 1715 cm^-1. Which of the following functional groups are likely present in this compound?",
            options: [
                "An alcohol and an amine",
                "A carboxylic acid",
                "An ester and an ether",
                "A ketone and an alkene"
            ],
            correctIndex: 1,
            explanation: {
                correct: "A strong, broad absorption band around 3300 cm^-1 represents an O-H stretch (alcohol or carboxylic acid). A strong, sharp peak at 1715 cm^-1 represents a carbonyl (C=O) stretch. Together, a broad O-H stretch and a C=O stretch in the same compound are highly characteristic of a carboxylic acid (where the O-H stretch is particularly broad, sometimes overlapping with C-H stretches).",
                incorrect: [
                    "An amine shows a sharper, less broad N-H stretch (often with doublets for primary amines) around 3300-3500 cm^-1, and lacks the 1715 cm^-1 C=O peak.",
                    "An ester has a C=O peak at ~1735 cm^-1 and an ether has C-O stretches at ~1050-1150 cm^-1, but neither has an O-H band at 3300 cm^-1.",
                    "An alkene has a weak C=C stretch around 1650 cm^-1, not a broad O-H band at 3300 cm^-1."
                ]
            }
        },
        {
            id: 'oc2',
            question: "Which of the following reaction conditions and substrates would most favor an SN2 substitution mechanism over an SN1 mechanism?",
            options: [
                "Tertiary alkyl halide in a polar protic solvent",
                "Primary alkyl halide in a polar aprotic solvent",
                "Secondary alkyl halide in a polar protic solvent with a weak nucleophile",
                "Tertiary alkyl halide in a polar aprotic solvent"
            ],
            correctIndex: 1,
            explanation: {
                correct: "SN2 reactions are favored by: 1. Least hindered substrates (Primary > Secondary >> Tertiary) because the nucleophile must attack from the backside. 2. Strong nucleophiles. 3. Polar aprotic solvents (like DMSO, DMF, or acetone), which solvate the counter-cation but leave the nucleophile naked and highly reactive. Therefore, a primary alkyl halide in a polar aprotic solvent is optimal for SN2.",
                incorrect: [
                    "Tertiary alkyl halides undergo SN1 because steric hindrance prevents backside attack, and they form highly stable tertiary carbocations.",
                    "Secondary alkyl halides with weak nucleophiles in polar protic solvents favor SN1/E1 mechanisms.",
                    "Tertiary alkyl halides will not undergo SN2 regardless of solvent due to severe steric hindrance."
                ]
            }
        },
        {
            id: 'oc3',
            question: "During the synthesis of a peptide, two amino acids react to form a peptide bond. What are the structural and electronic properties of a peptide bond?",
            options: [
                "It is a single bond with free rotation and tetrahedral geometry.",
                "It exhibits partial double-bond character due to resonance, restricting rotation and creating a planar geometry.",
                "It is a weak ionic bond easily broken by fluctuations in temperature.",
                "It is a triple bond that cannot be hydrolyzed under acidic conditions."
            ],
            correctIndex: 1,
            explanation: {
                correct: "The peptide bond (amide linkage) is formed between the carboxyl carbon of one amino acid and the amino nitrogen of another. Due to resonance between the carbonyl oxygen and the nitrogen lone pair, the C-N bond has partial double-bond character. This locks the carbon and nitrogen in a planar geometry, restricting free rotation around the amide bond. Free rotation is only possible around the alpha-carbons (phi and psi angles).",
                incorrect: [
                    "It is not a pure single bond and rotation is highly restricted, not free.",
                    "It is a strong covalent bond, not a weak ionic bond.",
                    "It is not a triple bond and it can be chemically hydrolyzed using strong acids or enzymatically using peptidases."
                ]
            }
        },
        {
            id: 'oc4',
            question: "Which of the following describes the mechanism of the Aldol condensation between two molecules of acetaldehyde in the presence of a catalytic base?",
            options: [
                "Deprotonation of the carbonyl carbon to form a carbocation, followed by electrophilic addition.",
                "Deprotonation at the alpha-carbon to form a nucleophilic enolate, which attacks the carbonyl carbon of the second acetaldehyde molecule.",
                "Direct nucleophilic attack of the hydroxide catalyst on the methyl group, leading to substitution.",
                "Protonation of the oxygen atom followed by dehydration to yield an ether."
            ],
            correctIndex: 1,
            explanation: {
                correct: "The base-catalyzed Aldol condensation proceeds as follows: 1. A base deprotonates the acidic alpha-hydrogen of acetaldehyde, forming a resonance-stabilized enolate ion (nucleophile). 2. The enolate attacks the electrophilic carbonyl carbon of a second (neutral) acetaldehyde molecule, forming a beta-hydroxyaldehyde (aldol adduct). 3. Heating leads to dehydration (elimination of water) to form an alpha,beta-unsaturated aldehyde.",
                incorrect: [
                    "Carbonyl carbons are electrophilic and are not deprotonated to form carbocations.",
                    "Hydroxide does not attack the methyl group directly; it acts as a base to extract the acidic alpha-hydrogen.",
                    "The reaction leads to carbon-carbon bond formation and subsequent dehydration to a double bond (alkene/carbonyl conjugate), not an ether."
                ]
            }
        }
    ],
    biology: [
        {
            id: 'b1',
            question: "A pedigree chart shows a trait that affects males significantly more than females. Affected males do not pass the trait to their sons, but all of their daughters become carriers. When carrier females have children, approximately 50% of their sons display the trait. What is the most likely mode of inheritance?",
            options: [
                "Autosomal dominant",
                "Autosomal recessive",
                "X-linked dominant",
                "X-linked recessive"
            ],
            correctIndex: 3,
            explanation: {
                correct: "The description matches X-linked recessive inheritance. Affected males (X^d Y) pass their single X chromosome to all daughters, making them carriers (X^D X^d). Males cannot pass the trait to their sons because they pass their Y chromosome to sons. Carrier females have a 50% chance of passing their affected X chromosome to their sons, who will show the trait because they only have one X chromosome.",
                incorrect: [
                    "Autosomal dominant traits affect males and females equally and show vertical transmission (no skipped generations, affected parent has affected child).",
                    "Autosomal recessive traits affect males and females equally and often skip generations, but affected fathers can pass the allele to sons.",
                    "X-linked dominant traits would result in all daughters of an affected male displaying the trait (not just being carriers)."
                ]
            }
        },
        {
            id: 'b2',
            question: "During an action potential in a human neuron, what ion movement is primarily responsible for the rapid depolarization phase, and what channel gating event initiates it?",
            options: [
                "Efflux of K+ ions through voltage-gated K+ channels",
                "Influx of Na+ ions through voltage-gated Na+ channels",
                "Influx of Ca2+ ions through ligand-gated Ca2+ channels",
                "Active transport of Na+ and K+ by the Na+/K+ ATPase"
            ],
            correctIndex: 1,
            explanation: {
                correct: "The rapid depolarization phase of the action potential is caused by the opening of voltage-gated Na+ channels in response to the membrane potential reaching threshold. This allows sodium ions (Na+) to rush into the cell down their electrochemical gradient, making the inside of the cell highly positive.",
                incorrect: [
                    "Efflux of K+ ions is responsible for the repolarization and hyperpolarization phases, not depolarization.",
                    "Calcium influx is crucial for neurotransmitter release at the axon terminal but does not drive the depolarization phase of the axonal action potential.",
                    "The Na+/K+ ATPase restores resting gradients in the long term, but it is too slow to drive the rapid electrical changes of the action potential."
                ]
            }
        },
        {
            id: 'b3',
            question: "How do antidiuretic hormone (ADH) and aldosterone act differently on the kidneys to regulate blood volume and osmolarity?",
            options: [
                "ADH increases water reabsorption in the collecting duct, reducing blood osmolarity; Aldosterone increases Na+ reabsorption in the distal tubule, increasing volume without changing osmolarity.",
                "ADH increases sodium excretion, increasing blood osmolarity; Aldosterone increases water excretion, reducing volume.",
                "Both hormones increase sodium reabsorption, leading to an increase in blood osmolarity.",
                "ADH decreases water permeability in the collecting duct; Aldosterone decreases sodium channels in the proximal tubule."
            ],
            correctIndex: 0,
            explanation: {
                correct: "ADH (vasopressin) inserts aquaporin channels into the collecting duct, increasing water permeability. Water is reabsorbed without solutes, which increases blood volume and decreases blood osmolarity (dilutes the blood). Aldosterone increases the activity of Na+/K+ pumps in the distal convoluted tubule and collecting duct, leading to reabsorption of Na+ (and water follows passively). Because sodium and water are absorbed together, blood volume increases but osmolarity remains unchanged.",
                incorrect: [
                    "ADH decreases blood osmolarity (by absorbing pure water), and aldosterone increases volume, not sodium excretion.",
                    "ADH does not directly handle sodium reabsorption in the way aldosterone does, and aldosterone never increases water excretion.",
                    "ADH increases water permeability (reabsorption), whereas aldosterone increases sodium channels. They do not decrease these channels."
                ]
            }
        },
        {
            id: 'b4',
            question: "How does myelination of an axon affect action potential propagation velocity, and what is this mechanism called?",
            options: [
                "Myelination increases capacitance, slowing down propagation; called continuous conduction.",
                "Myelination decreases membrane resistance, forcing the signal to travel slower; called saltatory conduction.",
                "Myelination increases membrane resistance and decreases membrane capacitance, allowing the electrical signal to jump between Nodes of Ranvier; called saltatory conduction.",
                "Myelination disables the Na+/K+ ATPase, allowing the signal to travel without active transport; called passive drift."
            ],
            correctIndex: 2,
            explanation: {
                correct: "Myelin acts as an electrical insulator. By wrapping the axon, it increases membrane resistance (preventing ion leakage) and decreases membrane capacitance (allowing the membrane to depolarize faster). The electrical charge travels rapidly down the myelinated segments and triggers action potentials only at the unmyelinated Nodes of Ranvier, where voltage-gated Na+ channels are concentrated. This 'jumping' of the action potential is called saltatory conduction.",
                incorrect: [
                    "Myelination decreases capacitance (which increases velocity) and is called saltatory conduction, not continuous conduction.",
                    "Myelination increases membrane resistance, not decreases.",
                    "ATPase activity is still required at the Nodes of Ranvier to maintain electrochemical gradients, and conduction is active, not passive drift."
                ]
            }
        }
    ],
    psychiatry: [
        {
            id: 'ps1',
            question: "A child is able to perform conservation tasks (such as realizing that the volume of water remains the same when poured into a different shaped container) and can think logically about concrete events, but struggles with systematic abstract reasoning. According to Jean Piaget's stages of cognitive development, which stage is this child currently in?",
            options: [
                "Sensorimotor stage",
                "Preoperational stage",
                "Concrete operational stage",
                "Formal operational stage"
            ],
            correctIndex: 2,
            explanation: {
                correct: "The concrete operational stage (ages 7 to 11) is characterized by the development of logical thought about concrete objects and events, including the mastery of conservation (mass, volume, number). However, children in this stage still struggle with abstract, hypothetical reasoning.",
                incorrect: [
                    "The sensorimotor stage (ages 0-2) is marked by object permanence development and sensory/motor exploration.",
                    "The preoperational stage (ages 2-7) is characterized by egocentrism and symbolic thought, but children here fail conservation tasks.",
                    "The formal operational stage (ages 11+) is when adolescents gain the ability to think abstractly and formulate systematic hypotheses."
                ]
            }
        },
        {
            id: 'ps2',
            question: "A patient with anxiety is treated using systematic desensitization. The therapist explains that the goal is to replace the fear response with a relaxation response by pairing the feared stimulus with deep breathing exercises. What psychological concept underlies this therapeutic technique?",
            options: [
                "Operant conditioning via negative reinforcement",
                "Classical conditioning via counterconditioning",
                "Observational learning via modeling",
                "Cognitive restructuring via schema modification"
            ],
            correctIndex: 1,
            explanation: {
                correct: "Systematic desensitization is based on classical conditioning, specifically counterconditioning (or reciprocal inhibition). A conditioned response (fear) to a conditioned stimulus (e.g., spiders) is replaced by an incompatible response (relaxation) by pairing the stimulus with a relaxation technique until the fear response is extinguished.",
                incorrect: [
                    "Operant conditioning involves behaviors influenced by consequences (rewards/punishments), whereas systematic desensitization deals with involuntary autonomic fear responses.",
                    "Observational learning involves watching others, which is not the primary mechanism described here.",
                    "Cognitive restructuring is a cognitive therapy technique that targets thought patterns, while systematic desensitization focuses directly on physiological/behavioral responses."
                ]
            }
        },
        {
            id: 'ps3',
            question: "When a driver is cut off by another motorist, they immediately assume the other driver is reckless, aggressive, and a bad person, ignoring the possibility that the driver might be rushing to a medical emergency. What social psychology cognitive bias does this scenario illustrate?",
            options: [
                "Self-serving bias",
                "Fundamental attribution error",
                "Confirmation bias",
                "Actor-observer bias"
            ],
            correctIndex: 1,
            explanation: {
                correct: "The fundamental attribution error is the tendency to overemphasize dispositional (personality-based) explanations for others' behaviors while underemphasizing situational factors.",
                incorrect: [
                    "Self-serving bias is the tendency to attribute one's own successes to internal factors and failures to external factors.",
                    "Confirmation bias is the tendency to search for, interpret, and recall information in a way that confirms one's preexisting beliefs.",
                    "Actor-observer bias is the tendency to attribute our own actions to external factors and others' behaviors to internal factors. While related, attributing others' actions purely to dispositional factors (without comparing to self) is the classic definition of the fundamental attribution error."
                ]
            }
        },
        {
            id: 'ps4',
            question: "A subject can barely detect the difference between a 100g weight and a 105g weight, but cannot detect any difference between a 100g weight and a 103g weight. According to Weber's Law, what is the minimum weight difference that the same subject could detect when comparing a 200g weight?",
            options: [
                "5g",
                "10g",
                "6g",
                "3g"
            ],
            correctIndex: 1,
            explanation: {
                correct: "Weber's Law states that the just noticeable difference (JND) is a constant ratio of the original stimulus intensity: dI / I = k. Here, the threshold for detection is a 5g difference for a 100g starting weight, so the Weber fraction is k = 5g / 100g = 0.05 (or 5%). For a 200g weight, the required change dI is: dI = I * k = 200g * 0.05 = 10g.",
                incorrect: [
                    "5g would be the absolute threshold if JND was constant in magnitude, but Weber's Law states it is constant in proportion.",
                    "6g is incorrect and does not reflect the 5% ratio.",
                    "3g is below the threshold of detection."
                ]
            }
        }
    ]
};
