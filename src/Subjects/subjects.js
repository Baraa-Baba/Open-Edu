let history = { name: "history"}
let geography = { name: "Geography"}
let civics = { name: "civics"}
let philosophy = { name: "philosophy"}

export const GSSubjectOptions = [
  {
    name:'mathematics', units: [
      { name: 'revision'},
      { name: 'Functions', lessons: ['functions', 'Logarithmic function', 'exponential function', 'Integrals', 'Differential Equations'] },
      { name: 'Sequence'},
      { name: 'Probability, combinatorial', lessons: ['Conditional Probability', 'Permutations', 'Combinations'] },
      { name: 'Complex Numbers'},
      { name: 'Transformations', lessons: ['Translation, Rotation, & Symmetry','Dilation (homotheties)', 'Similitude', 'Complex Forms'] },
      { name: 'Lines and Planes'},
    ]
  },
  {
    name: 'physics', units: [
      { name: 'revision'},
      { name: 'Mechanics', lessons: ['Energy', 'linear Momentum'] },
      { name: 'Electricity', lessons: ['electromagnetic induction', 'Self - Induction', 'capacitor'] },
      { name: 'Aspects of Light', lessons: ['wave Apect of Light - Diffraction','Corpuscular aspect of light / Photoelectric Effect'] },
      { name: 'Atom, Nucleus and Universe', lessons: ['The Atom', 'Atomic Nucleus', 'Radioactivity', 'Nuclear Reactions'] }
    ]
  },
  {
    name: 'chemistry', units: [
      { name: 'revision'},
      { name: 'Chemical Kinetics', lessons: ['chemical kinetics and kinetic factors', 'chemical equilibrium'] },
      { name: 'acid - base', lessons: ['strong acid - strong base - pH metric titration', 'weak acid - weak base Conjugate Acid/Base pair'] },
      { name: 'organic chemistry', lessons: ['Functional Groups', 'Alcohols', 'Aldehydes and Ketones', 'Carboxlic Acids and thier Derivatives'] }
    ]
  },
  { name: 'arabic' },
  { name: 'english' },
  civics, geography, history, philosophy
  ]
  export const LSSubjectOptions = [
    {
      name:'mathematics', units: [
        { name: 'revision'},
        { name: 'Functions', lessons: ['functions', 'Logarithmic function', 'exponential function', 'Integrals'] },
        { name: 'Probability, combinatorial', lessons: ['Conditional Probability', 'Permutations', 'Combinations'] },
        { name: 'Lines and Planes'},
      ]
    },
    {
      name: 'physics', units: [
        { name: 'revision'},
        { name: 'Mechanics', lessons: ['Energy', 'linear Momentum'] },
        { name: 'Electricity', lessons: ['capacitor'] },
        { name: 'Aspects of Light', lessons: ['wave Apect of Light - Diffraction','Corpuscular aspect of light / Photoelectric Effect'] },
        { name: 'Atom, Nucleus and Universe', lessons: ['The Atom', 'Atomic Nucleus', 'Radioactivity'] }
      ]
    },
    {
      name: 'chemistry', units: [
        { name: 'revision' },
        { name: 'Chemical Kinetics', lessons: ['chemical kinetics', 'chemical equilibrium'] },
        { name: 'acid - base', lessons: ['strong acid - strong base - pH metric titration', 'weak acid - weak base Conjugate Acid/Base pair', 'Reacion between a Weak Acid and a Strong Base'] },
        { name: 'organic chemistry', lessons: ['Functional Groups', 'Alcohols', 'Aldehydes and Ketones', 'Carboxlic Acids'] }
      ]
    },
    {
      name:'Biology', units: [
        { name: 'revision'},
        { name: 'Genetics', lessons: ['Reproduction', 'Genetic polymorphism', "Human genetics"] },
        { name: 'Immunology', lessons: ['Self & Non-self', 'Immune Response', 'Immune Deficiency'] },
        { name: 'Neurophysiology', lessons: ['Functioning of neurons', 'Neurotransmitters'] },
        { name: 'Regulation', lessons: ['Female Hormones', 'Contraceptive methods'] }
      ]
    },
    { name: 'arabic' },
    { name: 'english' },
    civics, geography, history, philosophy
    ]
    export const ESSubjectOptions = [
      {
        name:'mathematics', units: [
          { name: 'revision'},
          { name: 'Functions', lessons: ['Functions of economics and social sciences', 'Rational Functions', 'Logarithmic function', 'exponential function'] },
          { name: 'Probability, Combinatorial', lessons: ['Conditional Probability', 'Permutations', 'Combinations'] },
          { name: 'Numerical sequences'},
          { name: 'Statistics'}
        ]
      },
      {
        name: 'physics', units: [
          { name: 'revision'},
          {name :'Energy' , lessons : ['Work and Mechanical Energy', 'Forms of Energy', 'Sources of Energy and the Pollution they Cause'] },
          { name: 'Radioactivity', lessons: ['Radioactivity', 'Stimulated Nuclear Reactions', 'Applications and Dangers of Radioactivity'] }
        ]
      },
      {
        name: 'chemistry', units: [
          { name: 'revision'},
          { name: 'Food Chemistry', lessons: ['Carbohydrates', 'Lipids', 'Protiens', 'Minerals and Vitamins', 'Nutritional requirements'] },
          { name: 'Current Medicinal Drugs'}
        ]
      },
      {
        name:'Biology', units: [
          { name: 'revision'},
          { name: 'Nutrition and Health', lessons: ['Balanced Diet', 'Nutritional Diseases'] },
          { name: 'Neurobiology', lessons: ['Nervous communication', 'Substance abuse'] },
          { name: 'Science and Economy', lessons: ['Biotechnology and Immunology', 'Biotechnology and environment'] }
        ]
      },
      { name: 'arabic' },
      { name: 'english' },
      {
        name:'Econonmy', units: [
          { name: 'النمو و التنمية'},
          { name: 'الَانظمة الاقتصادية'},
          { name: 'الََازمات الاقتصادية'},
          { name: 'السياسات الاقتصادية'},
          { name: 'الحسابات الاقتصادية'}
        ]
      },
      {
        name:'Sociology', units: [
          { name: 'علم االجتماع'},
          { name: 'الثقافة والمجتمع'},
          { name: 'قيم المجتمع'},
          { name: 'التفاوت الاجتماعي'},
          { name: 'الاندماج الاجتماعي'},
          { name: 'التغير الاجتماعي'},
          { name: 'السياسات الاجتماعي'},
          { name: 'المجتمع البناني'}
        ]
      },
      civics, geography, history, philosophy
      ] 
      export const LHSubjectOptions = [
        {
          name:'mathematics', units: [
            { name: 'revision' },
            { name: 'Functions', lessons: ['Rational Functions', 'Graphical Interpretation'] },
            { name: 'Statistics', lessons: ['Position measures of a statistical data', 'Dispersion measures of statistical data', 'Conditional probability'] }
          ]
        },
        {
          name: 'physics', units: [
            { name: 'revision' },{name :'Energy' , lessons : ['Work and Mechanical Energy', 'Forms of Energy', 'Sources of Energy and the Pollution they Cause'] },
            { name: 'Radioactivity', lessons: ['Radioactivity', 'Stimulated (Provoked) Nuclear Reactions: Fission and Fusion', 'Applications and Dangers of Radioactivity'] }
          ]
        },
        {
          name: 'chemistry', units: [
            { name: 'Food Chemistry', lessons: ['Carbohydrates', 'Lipids', 'Protiens', 'Minerals and Vitamins', 'Nutritional requirements'] },
            { name: 'Current Medicinal Drugs'}
          ]
        },
        {
          name:'Biology', units: [
            { name: 'revision'},
            { name: 'Nutrition and Health', lessons: ['Balanced Diet', 'Nutritional Diseases'] },
            { name: 'Neurobiology', lessons: ['Nervous communication', 'Substance abuse'] }
          ]
        },
        { name: 'arabic' },
        { name: 'english' },
        { name: 'Arab Philosphy' },
        { name: 'Philosphy' },
        civics, geography, history
        ]
        
export const typeApplcation = [{ name: 'explantion' }, { name: 'extra' }, { name: 'exams' }]

// bdi il Exams (final midyear) ykoono place seperate la kol subject mish la kol lesson
